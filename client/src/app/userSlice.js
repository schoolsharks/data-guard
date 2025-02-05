import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  name: null,
  email: null,
  company: null,
  session: null,
  totalPlayers: 0,
  connectionRequested: false,
  turnover: null,
  businessGrowth: null,
  finePaid: null,
  finePaidByGroup:null,
  averageFinePaid: null,
  personalityInfo: null,
  sq: null,
  answered: 0,
  error: null,
  status: 'idle',
};

export const createUser = createAsyncThunk(
  "user/create",
  async ({ name, email, phone, company }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/users/create`, {
        name,
        email,
        phone,
        company
      });
      const { user, session, sq, totalPlayers } = response.data;
      localStorage.setItem("user", user)
      localStorage.setItem("session", session)
      return { user, session, sq, name, totalPlayers };
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const sendConnectionRequest = createAsyncThunk(
  "user/connectionRequest",
  async ({ userId, email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/users/connectionRequest`, {
        userId, email
      })
      if (response.data.success) {
        return { success: true }
      }
      else {
        return { success: false }
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload?.user ?? state.user;
      state.session = action.payload?.session ?? state.session;
      state.name = action.payload?.name ?? state.name;
      state.company = action.payload?.company ?? state.company;
      state.sq = action.payload?.sq ?? state.sq;
      state.turnover = action.payload.turnover ?? state.turnover
      state.businessGrowth = action.payload.businessGrowth ?? state.businessGrowth
      state.finePaid = action.payload.finePaid ?? state.finePaid
      state.finePaidByGroup = action.payload.finePaidByGroup ?? state.finePaidByGroup
      state.personalityInfo = action.payload.personalityInfo ?? state.personalityInfo
      state.email = action.payload?.email ?? state.email;
      state.answered = action.payload?.answered ?? state.answered;
      state.averageFinePaid = action.payload?.averageFinePaid ?? state.averageFinePaid;
      state.totalPlayers = action.payload?.totalPlayers ?? state.totalPlayers
      state.connectionRequested = action.payload?.connectionRequested ?? state.connectionRequested
    },
    resetState: (state) => {
      state.user = null
      state.session = null
      state.name = null
      state.company = null
      state.sq = null
      state.turnover = null
      state.businessGrowth = null
      state.finePaid = null
      state.personalityInfo = null
      state.email = null
      state.answered = null
      state.totalPlayers = null
      state.connectionRequested = null
      state.status = "idle"
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload?.user;
        state.session = action.payload?.session;
        state.sq = action.payload?.sq;
        state.name = action.payload?.username;
        state.error = null;

      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
    // .addCase(sendConnectionRequest.pending, (state) => {
    //   state.status = 'loading';
    //   state.error = null;
    // })
    // .addCase(sendConnectionRequest.fulfilled, (state, action) => {
    //   if (action.payload?.success) {
    //     state.connectionRequested= true
    //   }
    //   state.status="succeeded"
    // })
    // .addCase(sendConnectionRequest.rejected, (state, action) => {
    //   state.status = 'failed';
    //   state.error = action.payload?;
    // });
  },
});

export const { setError, setUser, resetState } = usersSlice.actions;

export default usersSlice.reducer;
