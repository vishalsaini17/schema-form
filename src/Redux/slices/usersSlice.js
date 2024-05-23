import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: [],
};

const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    createUser: (state, action) => {
      const newUSer = { id: crypto.randomUUID(), ...action.payload };
      state.userList = [...state.userList, newUSer];
    },
    deleteUser: (state, action) => {
      const userID = action.payload;
      console.log("dispatch deleteUser:", userID);
      const newUserList = state.userList.filter(user => user.id !== userID);
      state.userList = newUserList;
    },
    updateUser: (state, action) => {
      const { id, ...restUserData } = action.payload;
      const newUserList = state.userList.map(user => {
        if (id === user.id) {
          return { ...user, ...restUserData }
        }
        return user;
      });

      state.userList = newUserList;
    }
  }
});

export const { createUser, deleteUser, updateUser } = usersSlice.actions;

const rootState = (state) => state;
export const userListSelector = createSelector(rootState, (state) => state.usersData.userList);
export const getUserFromId = (id) => createSelector(rootState, (state) => state.usersData.userList.find(user => user.id === id))

export default usersSlice.reducer;




// this is the sample obje of user details
const userType = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  addres: {
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    landmark: "",
  },
  summary: "",
  education: [
    {
      institute: "",
      degree: "",
      fieldOfStudy: "",
      batchStart: "",
      batchEnd: "",
      grade: "",
      ActivitiesAndExp: ""
    }
  ],
  workDetails: [
    {
      jobTitle: "",
      employmentType: "", // enum: Full-time, Part-time, Self-employed, Freelance, Internship, Trainee
      companyName: "",
      location: "",
      locationType: "", //enum: On-site, Hybrid, Remote
      currentlyWorkingForSameRole: true,
      startDate: "",
      endDate: "",
      taskOrProjects: [
        {
          name: "",
          details: ""
        }
      ]
    }
  ],
  skills: [
    {
      name: "",
      rating: "",
    }
  ],
}
