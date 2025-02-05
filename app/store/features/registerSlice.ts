import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { parseDate } from '@internationalized/date';

interface RegisterState {
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
  async () => {
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
    } else if (formData.email.length > 128) {
      errors.push({ input: 'email', message: 'Email must be less than 128 characters' });
    } else if (!emailRegex.test(formData.email)) {
      errors.push({ input: 'email', message: 'Invalid email address' });
    }
    
    if (formData.phone) {
      if (!phoneRegex.test(formData.phone)) {
        errors.push({ 
          input: 'phone', 
          message: 'Invalid phone number, remember to include country code like +1, +7, +41 etc.' 
        });
      } else if (formData.phone.length < 10) {
        errors.push({
          input: 'phone',
          message: 'Phone number must be at least 10 characters, remember to include country code'
        });
      } else if (formData.phone.length > 15) {
        errors.push({
          input: 'phone',
          message: 'Phone number must be less than 15 characters'
        });
      }
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
      errors.push({ input: 'username', message: 'You need to choose username' });
    } else if (formData.username.length < 3) {
      errors.push({ input: 'username', message: 'Username must be at least 3 characters' });
    } else if (formData.username.length > 20) {
      errors.push({ input: 'username', message: 'Username must be less than 20 characters' });
    } else if (!usernameRegex.test(formData.username)) {
      errors.push({ 
        input: 'username', 
        message: 'Username must contain only letters, numbers, underscores and dots' 
      });
    }
    return errors;
  },
  5: (formData) => {
    const errors: ValidationError[] = [];
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const today = new Date();
    
    if (!formData.dateOfBirth || !formData.dateOfBirth.match(dateRegex)) {
      errors.push({ input: 'dateOfBirth', message: 'Date of birth is required' });
    } else {
      try {
        const parsedDate = parseDate(formData.dateOfBirth);
        const isToday = 
          parsedDate.year === today.getFullYear() &&
          parsedDate.month === today.getMonth() + 1 &&
          parsedDate.day === today.getDate();

        if (isToday) {
          errors.push({ input: 'dateOfBirth', message: 'Date of birth is required' });
        }
        
        if (parsedDate.year < 1900) {
          errors.push({ input: 'dateOfBirth', message: 'Year must be set to 1900 or later' });
        }

        const age = today.getFullYear() - parsedDate.year;
        const monthDiff = today.getMonth() + 1 - parsedDate.month;
        const dayDiff = today.getDate() - parsedDate.day;
        
        if (age - (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? 1 : 0) < 16) {
          errors.push({ input: 'dateOfBirth', message: 'You must be at least 16 years old to register' });
        }
      } catch {
        errors.push({ input: 'dateOfBirth', message: 'Invalid date format' });
      }
    }

    const validGenders = ['male', 'female', 'other', 'prefer_not_to_say'];
    if (!formData.gender || !validGenders.includes(formData.gender)) {
      errors.push({ input: 'gender', message: 'You must select your gender' });
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
    } else if (formData.confirmPassword.length > 128) {
      errors.push({ input: 'confirmPassword', message: 'Confirm password must be less than 128 characters' });
    } else if (formData.password !== formData.confirmPassword) {
      errors.push({ input: 'confirmPassword', message: 'Passwords do not match' });
    }

    return errors;
  },
  7: () => [], // No validation needed for final confirmation step
};

export const validateStep = createAsyncThunk(
  'register/validateStep',
  async (currentStep: number, { getState }) => {
    const state = getState() as { register: RegisterState };
    const validator = validationRules[currentStep];
    
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
  updateFormData, 
  setErrors, 
  clearErrors, 
  resetRegistration,
} = registerSlice.actions;

export default registerSlice.reducer; 