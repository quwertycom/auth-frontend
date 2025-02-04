import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

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
    const state = getState() as { register: RegisterState };
    const formData = state.register.formData;
    
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('An unknown error occurred');
      }
    }
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
      });
  }
});

export const { 
  setStep, 
  updateFormData, 
  setErrors, 
  clearErrors, 
  resetRegistration 
} = registerSlice.actions;

export default registerSlice.reducer; 