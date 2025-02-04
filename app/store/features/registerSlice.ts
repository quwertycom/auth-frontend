import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { parseDate } from '@internationalized/date';

interface RegisterState {
  step: number;
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    confirmPassword: string;
    dateOfBirth: string;
    gender: string;
    termsAndConditions: boolean;
    emailNewsletter: boolean;
    phoneNewsletter: boolean;
  };
  errors: Array<{
    input: string;
    message: string;
  }>;
  isLoading: boolean;
  isSubmitted: boolean;
}

const initialState: RegisterState = {
  step: 0,
  formData: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    gender: '',
    termsAndConditions: false,
    emailNewsletter: false,
    phoneNewsletter: false,
  },
  errors: [],
  isLoading: false,
  isSubmitted: false,
};

export const submitRegistration = createAsyncThunk(
  'register/submit',
  async (_, { getState }) => {
    // Mock successful response
    return {
      user: { id: 'mock-user', email: 'test@example.com' },
      tokens: { access: 'mock-token', refresh: 'mock-refresh-token' }
    };
    
    // For real implementation, keep the existing fetch code
    // const state = getState() as { register: RegisterState };
    // const response = await fetch(...);
  }
);

export interface ValidationError {
  input: string;
  message: string;
}

export interface ValidationRules {
  [key: number]: (formData: RegisterState['formData']) => ValidationError[];
}

const validationRules: ValidationRules = {
  1: (formData) => {
    const errors: ValidationError[] = [];
    if (!formData.firstName.trim()) {
      errors.push({ input: 'firstName', message: 'First name is required' });
    } else if (formData.firstName.length > 128) {
      errors.push({ input: 'firstName', message: 'First name must be less than 128 characters' });
    }
    if (!formData.lastName.trim()) {
      errors.push({ input: 'lastName', message: 'Last name is required' });
    } else if (formData.lastName.length > 128) {
      errors.push({ input: 'lastName', message: 'Last name must be less than 128 characters' });
    }
    return errors;
  },
  2: (formData) => {
    const errors: ValidationError[] = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    
    if (!formData.email.trim()) {
      errors.push({ input: 'email', message: 'Email is required' });
    } else if (!emailRegex.test(formData.email)) {
      errors.push({ input: 'email', message: 'Invalid email address' });
    }
    
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      errors.push({ 
        input: 'phone', 
        message: 'Invalid phone number format with country code' 
      });
    }
    
    return errors;
  },
  3: (formData) => {
    if (!formData.termsAndConditions) {
      return [{ input: 'termsAndConditions', message: 'You must agree to the terms' }];
    }
    return [];
  },
  4: (formData) => {
    const errors: ValidationError[] = [];
    const usernameRegex = /^[a-z0-9_.]{3,20}$/;
    
    if (!formData.username.trim()) {
      errors.push({ input: 'username', message: 'Username is required' });
    } else if (!usernameRegex.test(formData.username)) {
      errors.push({ 
        input: 'username', 
        message: 'Username can only contain lowercase letters, numbers, dots and underscores' 
      });
    }
    return errors;
  },
  5: (formData) => {
    const errors: ValidationError[] = [];
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    
    if (!formData.dateOfBirth || !formData.dateOfBirth.match(dateRegex)) {
      errors.push({ input: 'dateOfBirth', message: 'Invalid date format (YYYY-MM-DD)' });
    } else {
      try {
        const parsedDate = parseDate(formData.dateOfBirth);
        const today = new Date();
        
        // Year validation
        if (parsedDate.year < 1900) {
          errors.push({ input: 'dateOfBirth', message: 'Year must be 1900 or later' });
        }
        
        // Age validation
        const age = today.getFullYear() - parsedDate.year;
        if (age < 16) {
          errors.push({ input: 'dateOfBirth', message: 'You must be at least 16 years old' });
        }
      } catch {
        errors.push({ input: 'dateOfBirth', message: 'Invalid date format' });
      }
    }

    if (!formData.gender) {
      errors.push({ input: 'gender', message: 'Gender selection is required' });
    }
    
    return errors;
  },
  6: (formData) => {
    const errors: ValidationError[] = [];
    
    if (!formData.password.trim()) {
      errors.push({ input: 'password', message: 'Password is required' });
    } else if (formData.password.length < 8) {
      errors.push({ input: 'password', message: 'Password must be at least 8 characters' });
    } else if (formData.password.length > 128) {
      errors.push({ input: 'password', message: 'Password must be less than 128 characters' });
    }

    if (!formData.confirmPassword.trim()) {
      errors.push({ input: 'confirmPassword', message: 'Confirm password is required' });
    } else if (formData.password !== formData.confirmPassword) {
      errors.push({ input: 'confirmPassword', message: 'Passwords do not match' });
    }

    return errors;
  },
  7: () => [], // No validation needed for final confirmation step
};

export const validateStep = createAsyncThunk(
  'register/validateStep',
  (_, { getState }) => {
    const state = getState() as { register: RegisterState };
    const validator = validationRules[state.register.step];
    
    if (validator) {
      const errors = validator(state.register.formData);
      return { isValid: errors.length === 0, errors };
    }
    return { isValid: true, errors: [] };
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    updateFormData: (state, action: PayloadAction<Partial<RegisterState['formData']>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setErrors: (state, action: PayloadAction<RegisterState['errors']>) => {
      state.errors = action.payload;
    },
    clearErrors: (state) => {
      state.errors = [];
    },
    resetRegistration: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitRegistration.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitRegistration.fulfilled, (state) => {
        state.isLoading = false;
        state.isSubmitted = true;
      })
      .addCase(submitRegistration.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = [{
          input: 'general',
          message: action.error.message || 'Registration failed'
        }];
      })
      .addCase(validateStep.fulfilled, (state, action) => {
        state.errors = action.payload.errors;
      });
  }
});

export const { 
  setStep, 
  updateFormData, 
  setErrors, 
  clearErrors, 
  resetRegistration,
} = registerSlice.actions;

export default registerSlice.reducer; 