import { createApi } from '@reduxjs/toolkit/query/react';
import {
  CompanyUser,
  Group,
  ICity,
  ICountry,
  ICreateGroupMutation,
  IGetRoomsQueryParams,
  ILanguage,
  IRegion,
  IState,
  ISubRegion,
  ITimeZone,
  IToggelePermissionsMutation,
  RoomData,
  RoomUser,
  User,
  UserProfile,
} from 'types';
import { baseQuery } from './config';

export const api = createApi({
  baseQuery,
  reducerPath: 'postsApi',
  tagTypes: ['Company', 'Room', 'Group', 'User', 'Geographic'],
  endpoints: (build) => ({
    getUser: build.query<User, void>({
      query: () => ({
        url: 'users/',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getToken: build.query({
      query: ({ roomId, additionalFields }) => ({
        url: `room/${roomId}/join/`,
        method: 'POST',
        body: { additional_fields: additionalFields },
      }),
    }),
    getRooms: build.query<RoomData[], IGetRoomsQueryParams>({
      query: (params) => ({
        url: 'room/',
        method: 'GET',
        params,
      }),
      providesTags: ['Room'],
    }),
    getRoomDetailsByExternalID: build.query<RoomData, string>({
      query: (eventExternalId) => ({
        url: `room/${eventExternalId}/`,
        method: 'GET',
      }),
      providesTags: [],
    }),
    getRoomDetails: build.query<RoomData, number>({
      query: (eventId) => ({
        url: `room/${eventId}/`,
        method: 'GET',
      }),
      providesTags: [],
    }),
    getRoomUsers: build.query<RoomUser[], number>({
      query: (eventId) => ({
        url: `room/user/list/${eventId}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    destroyRoom: build.mutation<void, number>({
      query: (eventId) => ({
        url: `room/${eventId}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Room'],
    }),
    getCompanyUsersList: build.query<CompanyUser[], void>({
      query: () => ({
        url: 'company/users',
        method: 'GET',
      }),
      providesTags: ['Company', 'User'],
    }),
    createRoom: build.mutation<RoomData, FormData>({
      query: (body) => ({
        url: 'room/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Room'],
    }),
    createRoomUser: build.mutation({
      query: ({ room: eventId, user: userId }) => ({
        url: 'room/user/',
        method: 'POST',
        body: { room: eventId, user: userId },
      }),
      invalidatesTags: ['User'],
    }),
    removeRoomUser: build.mutation<void, number>({
      query: (userId) => ({
        url: `room/user/${userId}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Room', 'User'],
    }),
    createGroup: build.mutation<void, ICreateGroupMutation>({
      query: ({ name, roomId: room, externalId }) => ({
        url: `groups/${externalId}/groups/`,
        method: 'POST',
        body: { name, room },
      }),
      invalidatesTags: ['Room'],
    }),
    getGroupListInMeetingUsers: build.query<Group[], string | undefined>({
      query: (eventExternalId) => ({
        url: `groups/${eventExternalId}/groups/users/`,
        method: 'GET',
      }),
      providesTags: ['Room'],
    }),
    getGroupList: build.query<Group[], string | undefined>({
      query: (eventExternalId) => ({
        url: `groups/${eventExternalId}/groups`,
        method: 'GET',
      }),
      providesTags: ['Room', 'Group', 'User'],
    }),
    removeGroup: build.mutation<void, number>({
      query: (groupId) => ({
        url: `groups/${groupId}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Group', 'Room'],
    }),
    createGroupUsers: build.mutation({
      query: ({ room_user: user, group: groupId }) => ({
        url: 'groups/users/',
        method: 'POST',
        body: { room_user: user, group: groupId },
      }),
      invalidatesTags: ['Group', 'Room'],
    }),
    removeGroupUser: build.mutation({
      query: (groupUserId) => ({
        url: `groups/users/${groupUserId}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Group', 'Room', 'User'],
    }),
    updateSubscribedTracks: build.mutation({
      query: ({ identity, eventId }) => ({
        url: `groups/${eventId}/users/${identity}/`,
        method: 'PATCH',
      }),
      invalidatesTags: [],
    }),
    createGroupUserFromEmail: build.mutation({
      query: ({ email, groupId }) => ({
        url: `room/user/invite/${groupId}/`,
        body: [{ email }],
        method: 'POST',
      }),
      invalidatesTags: ['User', 'Group', 'Room'],
    }),
    switchGroup: build.mutation({
      query: ({ userId, groupId }) => ({
        url: `groups/user/${userId}/`,
        body: { group: groupId },
        method: 'PATCH',
      }),
      invalidatesTags: ['Group', 'Room', 'User'],
    }),
    togglePermissions: build.mutation<void, IToggelePermissionsMutation>({
      query: ({ id, body }) => ({
        url: `room/user/permissions/${id}/`,
        body,
        method: 'PATCH',
      }),
      invalidatesTags: ['Group', 'Room', 'User'],
    }),
    getCurrentGroup: build.query<Group, number>({
      query: (eventId) => ({
        url: `groups/current/${eventId}/`,
        method: 'GET',
      }),
      providesTags: ['Group', 'Room', 'User'],
    }),
    getUserProfile: build.query<UserProfile, void>({
      query: () => ({
        url: 'users/profile',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    updateUser: build.mutation({
      query: (body) => ({
        url: 'users/',
        body,
        method: 'PATCH',
      }),
      invalidatesTags: ['User'],
    }),
    updateUserProfile: build.mutation({
      query: (body) => ({
        url: 'users/profile',
        body,
        method: 'PATCH',
      }),
      invalidatesTags: ['User'],
    }),
    updateProfilePicture: build.mutation<UserProfile, FormData>({
      query: (body) => ({
        url: 'users/profile',
        body,
        method: 'PATCH',
      }),
      invalidatesTags: ['User'],
    }),
    getLanguages: build.query<ILanguage[], void>({
      query: () => ({
        url: 'geographic/languages',
        method: 'GET',
      }),
      providesTags: ['Geographic'],
    }),
    getTimeZones: build.query<ITimeZone[], void>({
      query: () => ({
        url: 'geographic/timezone',
        method: 'GET',
      }),
      providesTags: ['Geographic'],
    }),
    getRegions: build.query<IRegion[], void>({
      query: () => ({
        url: 'geographic/regions',
        method: 'GET',
      }),
      providesTags: ['Geographic'],
    }),
    getSubRegions: build.query<ISubRegion[], number | null>({
      query: (region) => ({
        url: 'geographic/subregions',
        method: 'GET',
        params: { region },
      }),
      providesTags: ['Geographic'],
    }),

    getCountries: build.query<ICountry[], { region?: number | null; subregion?: number | null }>({
      query: ({ region, subregion }) => ({
        url: 'geographic/countries',
        method: 'GET',
        params: { region, subregion },
      }),
      providesTags: ['Geographic'],
    }),
    getStates: build.query<IState[], number | null>({
      query: (country) => ({
        url: 'geographic/states',
        method: 'GET',
        params: { country },
      }),
      providesTags: ['Geographic'],
    }),
    getCities: build.query<ICity[], number | null>({
      query: (state) => ({
        url: 'geographic/cities',
        method: 'GET',
        params: { state },
      }),
      providesTags: ['Geographic'],
    }),
  }),
});

export const {
  useGetCurrentGroupQuery,
  useGetTokenQuery,
  useGetRoomsQuery,
  useGetRoomDetailsByExternalIDQuery,
  useGetRoomUsersQuery,
  useDestroyRoomMutation,
  useGetUserQuery,
  useGetCompanyUsersListQuery,
  useCreateRoomMutation,
  useCreateRoomUserMutation,
  useRemoveRoomUserMutation,
  useCreateGroupMutation,
  useGetGroupListQuery,
  useGetGroupListInMeetingUsersQuery,
  useRemoveGroupMutation,
  useCreateGroupUsersMutation,
  useRemoveGroupUserMutation,
  useUpdateSubscribedTracksMutation,
  useCreateGroupUserFromEmailMutation,
  useSwitchGroupMutation,
  useTogglePermissionsMutation,
  useGetUserProfileQuery,
  useUpdateUserMutation,
  useUpdateUserProfileMutation,
  useGetLanguagesQuery,
  useGetTimeZonesQuery,
  useGetRegionsQuery,
  useGetSubRegionsQuery,
  useGetCountriesQuery,
  useGetStatesQuery,
  useGetCitiesQuery,
  useUpdateProfilePictureMutation,
} = api;
