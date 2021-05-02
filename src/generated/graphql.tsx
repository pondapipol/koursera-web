import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Course = {
  __typename?: 'Course';
  courseId: Scalars['Int'];
  courseName: Scalars['String'];
  courseDescription: Scalars['String'];
  category: Scalars['String'];
  timeEstimation: Scalars['String'];
  level: Scalars['String'];
  organization: Scalars['String'];
  creatorId: Scalars['Float'];
  coverImage: Scalars['String'];
  createDate: Scalars['DateTime'];
};

export type CourseUnit = {
  __typename?: 'CourseUnit';
  UnitId: Scalars['Int'];
  unitName: Scalars['String'];
  unitDescription: Scalars['String'];
  createDate: Scalars['DateTime'];
  courseId: Scalars['Float'];
};

export type CourseUserPayment = {
  __typename?: 'CourseUserPayment';
  payId: Scalars['Int'];
  paid: Scalars['Boolean'];
  cardnumber: Scalars['String'];
  exmonth: Scalars['String'];
  exyear: Scalars['String'];
  cvc: Scalars['String'];
  userId: Scalars['Float'];
  courseId: Scalars['Float'];
};


export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  updateUser: Scalars['Boolean'];
  register: Scalars['Boolean'];
  login: LoginResponse;
  revokeRefreshTokensForUser: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  CreateCourse: Scalars['Boolean'];
  updateCourse: Scalars['Boolean'];
  deleteCourse: Scalars['Boolean'];
  addCourseUnit: Scalars['Boolean'];
  updateUnit: Scalars['Boolean'];
  deleteCourseunit: Scalars['Boolean'];
  deleteSubunit: Scalars['Boolean'];
  updateSubunit: Scalars['Boolean'];
  addSubunit: Scalars['Boolean'];
  unenroll: Scalars['Boolean'];
  enroll: Scalars['Boolean'];
};


export type MutationUpdateUserArgs = {
  age: Scalars['String'];
  aboutme: Scalars['String'];
  profileImage: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  userId: Scalars['Float'];
};


export type MutationRegisterArgs = {
  role: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRevokeRefreshTokensForUserArgs = {
  userId: Scalars['Int'];
};


export type MutationCreateCourseArgs = {
  coverImage: Scalars['String'];
  creatorId: Scalars['Float'];
  organization: Scalars['String'];
  level: Scalars['String'];
  timeEst: Scalars['String'];
  category: Scalars['String'];
  CourseDescription: Scalars['String'];
  CourseName: Scalars['String'];
};


export type MutationUpdateCourseArgs = {
  coverImage: Scalars['String'];
  organization: Scalars['String'];
  level: Scalars['String'];
  timeEst: Scalars['String'];
  category: Scalars['String'];
  CourseDescription: Scalars['String'];
  CourseName: Scalars['String'];
  courseId: Scalars['Float'];
};


export type MutationDeleteCourseArgs = {
  courseId: Scalars['Float'];
};


export type MutationAddCourseUnitArgs = {
  courseId: Scalars['Float'];
  unitDescription: Scalars['String'];
  unitName: Scalars['String'];
};


export type MutationUpdateUnitArgs = {
  unitDescription: Scalars['String'];
  unitName: Scalars['String'];
  unitId: Scalars['Float'];
};


export type MutationDeleteCourseunitArgs = {
  UnitId: Scalars['Float'];
};


export type MutationDeleteSubunitArgs = {
  subId: Scalars['Float'];
};


export type MutationUpdateSubunitArgs = {
  createDate: Scalars['String'];
  unitId: Scalars['Float'];
  videoDescripiton: Scalars['String'];
  videoPath: Scalars['String'];
  content: Scalars['String'];
  contentType: Scalars['String'];
  subName: Scalars['String'];
  subId: Scalars['Float'];
};


export type MutationAddSubunitArgs = {
  unitId: Scalars['Float'];
  videoDescripiton: Scalars['String'];
  videoPath: Scalars['String'];
  content: Scalars['String'];
  contentType: Scalars['String'];
  subName: Scalars['String'];
};


export type MutationUnenrollArgs = {
  userId: Scalars['Float'];
  courseId: Scalars['Float'];
};


export type MutationEnrollArgs = {
  courseId: Scalars['Float'];
  userId: Scalars['Float'];
  cvc: Scalars['String'];
  exyear: Scalars['String'];
  exmonth: Scalars['String'];
  cardnumber: Scalars['String'];
  paid: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  authortest: Scalars['String'];
  hello: Scalars['String'];
  bye: User;
  authandRole?: Maybe<User>;
  users: Array<User>;
  usersid: User;
  me?: Maybe<User>;
  course: Array<Course>;
  courseExplore: Array<Course>;
  coursefind: Array<Course>;
  courseOne: Course;
  ispaid: CourseUserPayment;
  courseSearch: Array<Course>;
  courseunit: Array<CourseUnit>;
  courseunitOne: CourseUnit;
  subunit: Array<SubUnit>;
  subunitOne: SubUnit;
  instructorCourse: Array<Course>;
  individualCourse: Array<Course>;
  paymentstatus: Array<CourseUserPayment>;
  enrolledCourse: Array<CourseUserPayment>;
  enrolledCourseId: Scalars['Boolean'];
};


export type QueryUsersidArgs = {
  userId: Scalars['Float'];
};


export type QueryCourseArgs = {
  findmethod: Scalars['String'];
};


export type QueryCourseExploreArgs = {
  findmethod: Scalars['String'];
};


export type QueryCourseOneArgs = {
  courseId: Scalars['Float'];
};


export type QueryIspaidArgs = {
  courseId: Scalars['Float'];
};


export type QueryCourseSearchArgs = {
  name: Scalars['String'];
};


export type QueryCourseunitArgs = {
  courseId: Scalars['Float'];
};


export type QueryCourseunitOneArgs = {
  unitId: Scalars['Float'];
};


export type QuerySubunitArgs = {
  unitId: Scalars['Float'];
};


export type QuerySubunitOneArgs = {
  subId: Scalars['Float'];
};


export type QueryInstructorCourseArgs = {
  creatorId: Scalars['Float'];
};


export type QueryIndividualCourseArgs = {
  courseId: Scalars['Float'];
};


export type QueryEnrolledCourseArgs = {
  userId: Scalars['Float'];
};


export type QueryEnrolledCourseIdArgs = {
  courseId: Scalars['Float'];
  userId: Scalars['Float'];
};

export type SubUnit = {
  __typename?: 'SubUnit';
  subId: Scalars['Int'];
  subName: Scalars['String'];
  contentType: Scalars['String'];
  content: Scalars['String'];
  videoPath: Scalars['String'];
  videoDescription: Scalars['String'];
  createDate: Scalars['DateTime'];
  UnitId: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  name: Scalars['String'];
  profileimage: Scalars['String'];
  aboutme: Scalars['String'];
  age: Scalars['String'];
  email: Scalars['String'];
  role: Scalars['String'];
};

export type AddSubunitMutationVariables = Exact<{
  subname: Scalars['String'];
  videoPath: Scalars['String'];
  videoDescription: Scalars['String'];
  contentType: Scalars['String'];
  content: Scalars['String'];
  unitId: Scalars['Float'];
}>;


export type AddSubunitMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addSubunit'>
);

export type AddunitMutationVariables = Exact<{
  unitName: Scalars['String'];
  unitDes: Scalars['String'];
  courseId: Scalars['Float'];
}>;


export type AddunitMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addCourseUnit'>
);

export type AuthandRoleQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthandRoleQuery = (
  { __typename?: 'Query' }
  & { authandRole?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'role'>
  )> }
);

export type ByeQueryVariables = Exact<{ [key: string]: never; }>;


export type ByeQuery = (
  { __typename?: 'Query' }
  & { bye: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'role'>
  ) }
);

export type CourseOneQueryVariables = Exact<{
  courseId: Scalars['Float'];
}>;


export type CourseOneQuery = (
  { __typename?: 'Query' }
  & { courseOne: (
    { __typename?: 'Course' }
    & Pick<Course, 'courseId' | 'courseName' | 'courseDescription' | 'category' | 'timeEstimation' | 'level' | 'organization' | 'creatorId' | 'coverImage'>
  ) }
);

export type CourseSearchQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type CourseSearchQuery = (
  { __typename?: 'Query' }
  & { courseSearch: Array<(
    { __typename?: 'Course' }
    & Pick<Course, 'courseId' | 'courseName' | 'coverImage' | 'organization'>
  )> }
);

export type CourseUnitOneQueryVariables = Exact<{
  unitId: Scalars['Float'];
}>;


export type CourseUnitOneQuery = (
  { __typename?: 'Query' }
  & { courseunitOne: (
    { __typename?: 'CourseUnit' }
    & Pick<CourseUnit, 'unitName' | 'unitDescription' | 'createDate' | 'courseId'>
  ) }
);

export type CourseexploreQueryVariables = Exact<{
  method: Scalars['String'];
}>;


export type CourseexploreQuery = (
  { __typename?: 'Query' }
  & { courseExplore: Array<(
    { __typename?: 'Course' }
    & Pick<Course, 'courseId' | 'courseName' | 'courseDescription' | 'category' | 'createDate' | 'coverImage' | 'creatorId' | 'organization'>
  )> }
);

export type CoursehomeQueryVariables = Exact<{
  method: Scalars['String'];
}>;


export type CoursehomeQuery = (
  { __typename?: 'Query' }
  & { course: Array<(
    { __typename?: 'Course' }
    & Pick<Course, 'courseId' | 'courseName' | 'courseDescription' | 'category' | 'createDate' | 'coverImage' | 'creatorId' | 'organization'>
  )> }
);

export type CreatecourseMutationVariables = Exact<{
  CourseName: Scalars['String'];
  CourseDescription: Scalars['String'];
  category: Scalars['String'];
  timeEst: Scalars['String'];
  level: Scalars['String'];
  Organization: Scalars['String'];
  creatorId: Scalars['Float'];
  coverImage: Scalars['String'];
}>;


export type CreatecourseMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'CreateCourse'>
);

export type DeleteCourseMutationVariables = Exact<{
  courseId: Scalars['Float'];
}>;


export type DeleteCourseMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteCourse'>
);

export type DeleteSubUnitMutationVariables = Exact<{
  subId: Scalars['Float'];
}>;


export type DeleteSubUnitMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteSubunit'>
);

export type DeleteunitMutationVariables = Exact<{
  UnitId: Scalars['Float'];
}>;


export type DeleteunitMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteCourseunit'>
);

export type EditsubUnitMutationVariables = Exact<{
  subId: Scalars['Float'];
  subName: Scalars['String'];
  videoPath: Scalars['String'];
  videoDescription: Scalars['String'];
  content: Scalars['String'];
  contentType: Scalars['String'];
  unitId: Scalars['Float'];
  createDate: Scalars['String'];
}>;


export type EditsubUnitMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateSubunit'>
);

export type EnrollMutationVariables = Exact<{
  paid: Scalars['Boolean'];
  cardnumber: Scalars['String'];
  exmonth: Scalars['String'];
  exyear: Scalars['String'];
  cvc: Scalars['String'];
  courseId: Scalars['Float'];
  userId: Scalars['Float'];
}>;


export type EnrollMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'enroll'>
);

export type EnrolledCourseQueryVariables = Exact<{
  userId: Scalars['Float'];
}>;


export type EnrolledCourseQuery = (
  { __typename?: 'Query' }
  & { enrolledCourse: Array<(
    { __typename?: 'CourseUserPayment' }
    & Pick<CourseUserPayment, 'courseId' | 'paid'>
  )> }
);

export type OneSubUnitQueryVariables = Exact<{
  subId: Scalars['Float'];
}>;


export type OneSubUnitQuery = (
  { __typename?: 'Query' }
  & { subunitOne: (
    { __typename?: 'SubUnit' }
    & Pick<SubUnit, 'subName' | 'contentType' | 'content' | 'videoPath' | 'videoDescription' | 'createDate' | 'UnitId'>
  ) }
);

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type IndividualCourseQueryVariables = Exact<{
  courseId: Scalars['Float'];
}>;


export type IndividualCourseQuery = (
  { __typename?: 'Query' }
  & { individualCourse: Array<(
    { __typename?: 'Course' }
    & Pick<Course, 'courseId' | 'courseName' | 'courseDescription' | 'category' | 'coverImage' | 'timeEstimation' | 'level' | 'createDate'>
  )> }
);

export type InstructorCourseQueryVariables = Exact<{
  creatorId: Scalars['Float'];
}>;


export type InstructorCourseQuery = (
  { __typename?: 'Query' }
  & { instructorCourse: Array<(
    { __typename?: 'Course' }
    & Pick<Course, 'courseId' | 'courseName' | 'courseDescription' | 'category' | 'coverImage' | 'timeEstimation' | 'level' | 'createDate'>
  )> }
);

export type IsenrolledQueryVariables = Exact<{
  userId: Scalars['Float'];
  courseId: Scalars['Float'];
}>;


export type IsenrolledQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'enrolledCourseId'>
);

export type IsPaidQueryVariables = Exact<{
  courseId: Scalars['Float'];
}>;


export type IsPaidQuery = (
  { __typename?: 'Query' }
  & { ispaid: (
    { __typename?: 'CourseUserPayment' }
    & Pick<CourseUserPayment, 'payId' | 'paid' | 'cardnumber'>
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email'>
    ) }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
  )> }
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['String'];
  name: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);

export type SubUnitQueryVariables = Exact<{
  unitId: Scalars['Float'];
}>;


export type SubUnitQuery = (
  { __typename?: 'Query' }
  & { subunit: Array<(
    { __typename?: 'SubUnit' }
    & Pick<SubUnit, 'subId' | 'subName' | 'contentType' | 'content' | 'videoPath' | 'createDate' | 'UnitId'>
  )> }
);

export type UnenrollMutationVariables = Exact<{
  userId: Scalars['Float'];
  courseId: Scalars['Float'];
}>;


export type UnenrollMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'unenroll'>
);

export type UnitQueryVariables = Exact<{
  courseId: Scalars['Float'];
}>;


export type UnitQuery = (
  { __typename?: 'Query' }
  & { courseunit: Array<(
    { __typename?: 'CourseUnit' }
    & Pick<CourseUnit, 'UnitId' | 'unitName' | 'unitDescription' | 'courseId'>
  )> }
);

export type UpdateCourseMutationVariables = Exact<{
  courseId: Scalars['Float'];
  courseName: Scalars['String'];
  courseDes: Scalars['String'];
  category: Scalars['String'];
  timeEst: Scalars['String'];
  level: Scalars['String'];
  organization: Scalars['String'];
  coverImage: Scalars['String'];
}>;


export type UpdateCourseMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateCourse'>
);

export type UpdateunitdetailMutationVariables = Exact<{
  unitId: Scalars['Float'];
  unitName: Scalars['String'];
  unitDes: Scalars['String'];
}>;


export type UpdateunitdetailMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateUnit'>
);

export type UpdateUserMutationVariables = Exact<{
  userId: Scalars['Float'];
  name: Scalars['String'];
  email: Scalars['String'];
  profileimage: Scalars['String'];
  aboutme: Scalars['String'];
  age: Scalars['String'];
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateUser'>
);

export type UserprofileQueryVariables = Exact<{
  userId: Scalars['Float'];
}>;


export type UserprofileQuery = (
  { __typename?: 'Query' }
  & { usersid: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'profileimage' | 'role' | 'age' | 'aboutme'>
  ) }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'role'>
  )> }
);


export const AddSubunitDocument = gql`
    mutation addSubunit($subname: String!, $videoPath: String!, $videoDescription: String!, $contentType: String!, $content: String!, $unitId: Float!) {
  addSubunit(
    subName: $subname
    videoPath: $videoPath
    videoDescripiton: $videoDescription
    contentType: $contentType
    content: $content
    unitId: $unitId
  )
}
    `;
export type AddSubunitMutationFn = Apollo.MutationFunction<AddSubunitMutation, AddSubunitMutationVariables>;

/**
 * __useAddSubunitMutation__
 *
 * To run a mutation, you first call `useAddSubunitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSubunitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSubunitMutation, { data, loading, error }] = useAddSubunitMutation({
 *   variables: {
 *      subname: // value for 'subname'
 *      videoPath: // value for 'videoPath'
 *      videoDescription: // value for 'videoDescription'
 *      contentType: // value for 'contentType'
 *      content: // value for 'content'
 *      unitId: // value for 'unitId'
 *   },
 * });
 */
export function useAddSubunitMutation(baseOptions?: Apollo.MutationHookOptions<AddSubunitMutation, AddSubunitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddSubunitMutation, AddSubunitMutationVariables>(AddSubunitDocument, options);
      }
export type AddSubunitMutationHookResult = ReturnType<typeof useAddSubunitMutation>;
export type AddSubunitMutationResult = Apollo.MutationResult<AddSubunitMutation>;
export type AddSubunitMutationOptions = Apollo.BaseMutationOptions<AddSubunitMutation, AddSubunitMutationVariables>;
export const AddunitDocument = gql`
    mutation addunit($unitName: String!, $unitDes: String!, $courseId: Float!) {
  addCourseUnit(
    unitName: $unitName
    unitDescription: $unitDes
    courseId: $courseId
  )
}
    `;
export type AddunitMutationFn = Apollo.MutationFunction<AddunitMutation, AddunitMutationVariables>;

/**
 * __useAddunitMutation__
 *
 * To run a mutation, you first call `useAddunitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddunitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addunitMutation, { data, loading, error }] = useAddunitMutation({
 *   variables: {
 *      unitName: // value for 'unitName'
 *      unitDes: // value for 'unitDes'
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useAddunitMutation(baseOptions?: Apollo.MutationHookOptions<AddunitMutation, AddunitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddunitMutation, AddunitMutationVariables>(AddunitDocument, options);
      }
export type AddunitMutationHookResult = ReturnType<typeof useAddunitMutation>;
export type AddunitMutationResult = Apollo.MutationResult<AddunitMutation>;
export type AddunitMutationOptions = Apollo.BaseMutationOptions<AddunitMutation, AddunitMutationVariables>;
export const AuthandRoleDocument = gql`
    query authandRole {
  authandRole {
    id
    name
    email
    role
  }
}
    `;

/**
 * __useAuthandRoleQuery__
 *
 * To run a query within a React component, call `useAuthandRoleQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthandRoleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthandRoleQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuthandRoleQuery(baseOptions?: Apollo.QueryHookOptions<AuthandRoleQuery, AuthandRoleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthandRoleQuery, AuthandRoleQueryVariables>(AuthandRoleDocument, options);
      }
export function useAuthandRoleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthandRoleQuery, AuthandRoleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthandRoleQuery, AuthandRoleQueryVariables>(AuthandRoleDocument, options);
        }
export type AuthandRoleQueryHookResult = ReturnType<typeof useAuthandRoleQuery>;
export type AuthandRoleLazyQueryHookResult = ReturnType<typeof useAuthandRoleLazyQuery>;
export type AuthandRoleQueryResult = Apollo.QueryResult<AuthandRoleQuery, AuthandRoleQueryVariables>;
export const ByeDocument = gql`
    query Bye {
  bye {
    id
    name
    email
    role
  }
}
    `;

/**
 * __useByeQuery__
 *
 * To run a query within a React component, call `useByeQuery` and pass it any options that fit your needs.
 * When your component renders, `useByeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useByeQuery({
 *   variables: {
 *   },
 * });
 */
export function useByeQuery(baseOptions?: Apollo.QueryHookOptions<ByeQuery, ByeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ByeQuery, ByeQueryVariables>(ByeDocument, options);
      }
export function useByeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ByeQuery, ByeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ByeQuery, ByeQueryVariables>(ByeDocument, options);
        }
export type ByeQueryHookResult = ReturnType<typeof useByeQuery>;
export type ByeLazyQueryHookResult = ReturnType<typeof useByeLazyQuery>;
export type ByeQueryResult = Apollo.QueryResult<ByeQuery, ByeQueryVariables>;
export const CourseOneDocument = gql`
    query courseOne($courseId: Float!) {
  courseOne(courseId: $courseId) {
    courseId
    courseName
    courseDescription
    category
    timeEstimation
    level
    organization
    creatorId
    coverImage
  }
}
    `;

/**
 * __useCourseOneQuery__
 *
 * To run a query within a React component, call `useCourseOneQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseOneQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseOneQuery({
 *   variables: {
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useCourseOneQuery(baseOptions: Apollo.QueryHookOptions<CourseOneQuery, CourseOneQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseOneQuery, CourseOneQueryVariables>(CourseOneDocument, options);
      }
export function useCourseOneLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseOneQuery, CourseOneQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseOneQuery, CourseOneQueryVariables>(CourseOneDocument, options);
        }
export type CourseOneQueryHookResult = ReturnType<typeof useCourseOneQuery>;
export type CourseOneLazyQueryHookResult = ReturnType<typeof useCourseOneLazyQuery>;
export type CourseOneQueryResult = Apollo.QueryResult<CourseOneQuery, CourseOneQueryVariables>;
export const CourseSearchDocument = gql`
    query courseSearch($name: String!) {
  courseSearch(name: $name) {
    courseId
    courseName
    coverImage
    organization
  }
}
    `;

/**
 * __useCourseSearchQuery__
 *
 * To run a query within a React component, call `useCourseSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseSearchQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCourseSearchQuery(baseOptions: Apollo.QueryHookOptions<CourseSearchQuery, CourseSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseSearchQuery, CourseSearchQueryVariables>(CourseSearchDocument, options);
      }
export function useCourseSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseSearchQuery, CourseSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseSearchQuery, CourseSearchQueryVariables>(CourseSearchDocument, options);
        }
export type CourseSearchQueryHookResult = ReturnType<typeof useCourseSearchQuery>;
export type CourseSearchLazyQueryHookResult = ReturnType<typeof useCourseSearchLazyQuery>;
export type CourseSearchQueryResult = Apollo.QueryResult<CourseSearchQuery, CourseSearchQueryVariables>;
export const CourseUnitOneDocument = gql`
    query courseUnitOne($unitId: Float!) {
  courseunitOne(unitId: $unitId) {
    unitName
    unitDescription
    createDate
    courseId
  }
}
    `;

/**
 * __useCourseUnitOneQuery__
 *
 * To run a query within a React component, call `useCourseUnitOneQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseUnitOneQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseUnitOneQuery({
 *   variables: {
 *      unitId: // value for 'unitId'
 *   },
 * });
 */
export function useCourseUnitOneQuery(baseOptions: Apollo.QueryHookOptions<CourseUnitOneQuery, CourseUnitOneQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseUnitOneQuery, CourseUnitOneQueryVariables>(CourseUnitOneDocument, options);
      }
export function useCourseUnitOneLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseUnitOneQuery, CourseUnitOneQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseUnitOneQuery, CourseUnitOneQueryVariables>(CourseUnitOneDocument, options);
        }
export type CourseUnitOneQueryHookResult = ReturnType<typeof useCourseUnitOneQuery>;
export type CourseUnitOneLazyQueryHookResult = ReturnType<typeof useCourseUnitOneLazyQuery>;
export type CourseUnitOneQueryResult = Apollo.QueryResult<CourseUnitOneQuery, CourseUnitOneQueryVariables>;
export const CourseexploreDocument = gql`
    query courseexplore($method: String!) {
  courseExplore(findmethod: $method) {
    courseId
    courseName
    courseDescription
    category
    createDate
    coverImage
    creatorId
    organization
  }
}
    `;

/**
 * __useCourseexploreQuery__
 *
 * To run a query within a React component, call `useCourseexploreQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseexploreQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseexploreQuery({
 *   variables: {
 *      method: // value for 'method'
 *   },
 * });
 */
export function useCourseexploreQuery(baseOptions: Apollo.QueryHookOptions<CourseexploreQuery, CourseexploreQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseexploreQuery, CourseexploreQueryVariables>(CourseexploreDocument, options);
      }
export function useCourseexploreLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseexploreQuery, CourseexploreQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseexploreQuery, CourseexploreQueryVariables>(CourseexploreDocument, options);
        }
export type CourseexploreQueryHookResult = ReturnType<typeof useCourseexploreQuery>;
export type CourseexploreLazyQueryHookResult = ReturnType<typeof useCourseexploreLazyQuery>;
export type CourseexploreQueryResult = Apollo.QueryResult<CourseexploreQuery, CourseexploreQueryVariables>;
export const CoursehomeDocument = gql`
    query coursehome($method: String!) {
  course(findmethod: $method) {
    courseId
    courseName
    courseDescription
    category
    createDate
    coverImage
    creatorId
    organization
  }
}
    `;

/**
 * __useCoursehomeQuery__
 *
 * To run a query within a React component, call `useCoursehomeQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoursehomeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCoursehomeQuery({
 *   variables: {
 *      method: // value for 'method'
 *   },
 * });
 */
export function useCoursehomeQuery(baseOptions: Apollo.QueryHookOptions<CoursehomeQuery, CoursehomeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CoursehomeQuery, CoursehomeQueryVariables>(CoursehomeDocument, options);
      }
export function useCoursehomeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CoursehomeQuery, CoursehomeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CoursehomeQuery, CoursehomeQueryVariables>(CoursehomeDocument, options);
        }
export type CoursehomeQueryHookResult = ReturnType<typeof useCoursehomeQuery>;
export type CoursehomeLazyQueryHookResult = ReturnType<typeof useCoursehomeLazyQuery>;
export type CoursehomeQueryResult = Apollo.QueryResult<CoursehomeQuery, CoursehomeQueryVariables>;
export const CreatecourseDocument = gql`
    mutation createcourse($CourseName: String!, $CourseDescription: String!, $category: String!, $timeEst: String!, $level: String!, $Organization: String!, $creatorId: Float!, $coverImage: String!) {
  CreateCourse(
    CourseName: $CourseName
    CourseDescription: $CourseDescription
    category: $category
    timeEst: $timeEst
    level: $level
    organization: $Organization
    creatorId: $creatorId
    coverImage: $coverImage
  )
}
    `;
export type CreatecourseMutationFn = Apollo.MutationFunction<CreatecourseMutation, CreatecourseMutationVariables>;

/**
 * __useCreatecourseMutation__
 *
 * To run a mutation, you first call `useCreatecourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatecourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createcourseMutation, { data, loading, error }] = useCreatecourseMutation({
 *   variables: {
 *      CourseName: // value for 'CourseName'
 *      CourseDescription: // value for 'CourseDescription'
 *      category: // value for 'category'
 *      timeEst: // value for 'timeEst'
 *      level: // value for 'level'
 *      Organization: // value for 'Organization'
 *      creatorId: // value for 'creatorId'
 *      coverImage: // value for 'coverImage'
 *   },
 * });
 */
export function useCreatecourseMutation(baseOptions?: Apollo.MutationHookOptions<CreatecourseMutation, CreatecourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatecourseMutation, CreatecourseMutationVariables>(CreatecourseDocument, options);
      }
export type CreatecourseMutationHookResult = ReturnType<typeof useCreatecourseMutation>;
export type CreatecourseMutationResult = Apollo.MutationResult<CreatecourseMutation>;
export type CreatecourseMutationOptions = Apollo.BaseMutationOptions<CreatecourseMutation, CreatecourseMutationVariables>;
export const DeleteCourseDocument = gql`
    mutation deleteCourse($courseId: Float!) {
  deleteCourse(courseId: $courseId)
}
    `;
export type DeleteCourseMutationFn = Apollo.MutationFunction<DeleteCourseMutation, DeleteCourseMutationVariables>;

/**
 * __useDeleteCourseMutation__
 *
 * To run a mutation, you first call `useDeleteCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCourseMutation, { data, loading, error }] = useDeleteCourseMutation({
 *   variables: {
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useDeleteCourseMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCourseMutation, DeleteCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCourseMutation, DeleteCourseMutationVariables>(DeleteCourseDocument, options);
      }
export type DeleteCourseMutationHookResult = ReturnType<typeof useDeleteCourseMutation>;
export type DeleteCourseMutationResult = Apollo.MutationResult<DeleteCourseMutation>;
export type DeleteCourseMutationOptions = Apollo.BaseMutationOptions<DeleteCourseMutation, DeleteCourseMutationVariables>;
export const DeleteSubUnitDocument = gql`
    mutation deleteSubUnit($subId: Float!) {
  deleteSubunit(subId: $subId)
}
    `;
export type DeleteSubUnitMutationFn = Apollo.MutationFunction<DeleteSubUnitMutation, DeleteSubUnitMutationVariables>;

/**
 * __useDeleteSubUnitMutation__
 *
 * To run a mutation, you first call `useDeleteSubUnitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSubUnitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSubUnitMutation, { data, loading, error }] = useDeleteSubUnitMutation({
 *   variables: {
 *      subId: // value for 'subId'
 *   },
 * });
 */
export function useDeleteSubUnitMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSubUnitMutation, DeleteSubUnitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSubUnitMutation, DeleteSubUnitMutationVariables>(DeleteSubUnitDocument, options);
      }
export type DeleteSubUnitMutationHookResult = ReturnType<typeof useDeleteSubUnitMutation>;
export type DeleteSubUnitMutationResult = Apollo.MutationResult<DeleteSubUnitMutation>;
export type DeleteSubUnitMutationOptions = Apollo.BaseMutationOptions<DeleteSubUnitMutation, DeleteSubUnitMutationVariables>;
export const DeleteunitDocument = gql`
    mutation deleteunit($UnitId: Float!) {
  deleteCourseunit(UnitId: $UnitId)
}
    `;
export type DeleteunitMutationFn = Apollo.MutationFunction<DeleteunitMutation, DeleteunitMutationVariables>;

/**
 * __useDeleteunitMutation__
 *
 * To run a mutation, you first call `useDeleteunitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteunitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteunitMutation, { data, loading, error }] = useDeleteunitMutation({
 *   variables: {
 *      UnitId: // value for 'UnitId'
 *   },
 * });
 */
export function useDeleteunitMutation(baseOptions?: Apollo.MutationHookOptions<DeleteunitMutation, DeleteunitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteunitMutation, DeleteunitMutationVariables>(DeleteunitDocument, options);
      }
export type DeleteunitMutationHookResult = ReturnType<typeof useDeleteunitMutation>;
export type DeleteunitMutationResult = Apollo.MutationResult<DeleteunitMutation>;
export type DeleteunitMutationOptions = Apollo.BaseMutationOptions<DeleteunitMutation, DeleteunitMutationVariables>;
export const EditsubUnitDocument = gql`
    mutation editsubUnit($subId: Float!, $subName: String!, $videoPath: String!, $videoDescription: String!, $content: String!, $contentType: String!, $unitId: Float!, $createDate: String!) {
  updateSubunit(
    subId: $subId
    subName: $subName
    videoPath: $videoPath
    videoDescripiton: $videoDescription
    content: $content
    contentType: $contentType
    unitId: $unitId
    createDate: $createDate
  )
}
    `;
export type EditsubUnitMutationFn = Apollo.MutationFunction<EditsubUnitMutation, EditsubUnitMutationVariables>;

/**
 * __useEditsubUnitMutation__
 *
 * To run a mutation, you first call `useEditsubUnitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditsubUnitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editsubUnitMutation, { data, loading, error }] = useEditsubUnitMutation({
 *   variables: {
 *      subId: // value for 'subId'
 *      subName: // value for 'subName'
 *      videoPath: // value for 'videoPath'
 *      videoDescription: // value for 'videoDescription'
 *      content: // value for 'content'
 *      contentType: // value for 'contentType'
 *      unitId: // value for 'unitId'
 *      createDate: // value for 'createDate'
 *   },
 * });
 */
export function useEditsubUnitMutation(baseOptions?: Apollo.MutationHookOptions<EditsubUnitMutation, EditsubUnitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditsubUnitMutation, EditsubUnitMutationVariables>(EditsubUnitDocument, options);
      }
export type EditsubUnitMutationHookResult = ReturnType<typeof useEditsubUnitMutation>;
export type EditsubUnitMutationResult = Apollo.MutationResult<EditsubUnitMutation>;
export type EditsubUnitMutationOptions = Apollo.BaseMutationOptions<EditsubUnitMutation, EditsubUnitMutationVariables>;
export const EnrollDocument = gql`
    mutation enroll($paid: Boolean!, $cardnumber: String!, $exmonth: String!, $exyear: String!, $cvc: String!, $courseId: Float!, $userId: Float!) {
  enroll(
    paid: $paid
    cardnumber: $cardnumber
    exmonth: $exmonth
    exyear: $exyear
    cvc: $cvc
    courseId: $courseId
    userId: $userId
  )
}
    `;
export type EnrollMutationFn = Apollo.MutationFunction<EnrollMutation, EnrollMutationVariables>;

/**
 * __useEnrollMutation__
 *
 * To run a mutation, you first call `useEnrollMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnrollMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enrollMutation, { data, loading, error }] = useEnrollMutation({
 *   variables: {
 *      paid: // value for 'paid'
 *      cardnumber: // value for 'cardnumber'
 *      exmonth: // value for 'exmonth'
 *      exyear: // value for 'exyear'
 *      cvc: // value for 'cvc'
 *      courseId: // value for 'courseId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useEnrollMutation(baseOptions?: Apollo.MutationHookOptions<EnrollMutation, EnrollMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EnrollMutation, EnrollMutationVariables>(EnrollDocument, options);
      }
export type EnrollMutationHookResult = ReturnType<typeof useEnrollMutation>;
export type EnrollMutationResult = Apollo.MutationResult<EnrollMutation>;
export type EnrollMutationOptions = Apollo.BaseMutationOptions<EnrollMutation, EnrollMutationVariables>;
export const EnrolledCourseDocument = gql`
    query enrolledCourse($userId: Float!) {
  enrolledCourse(userId: $userId) {
    courseId
    paid
  }
}
    `;

/**
 * __useEnrolledCourseQuery__
 *
 * To run a query within a React component, call `useEnrolledCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useEnrolledCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEnrolledCourseQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useEnrolledCourseQuery(baseOptions: Apollo.QueryHookOptions<EnrolledCourseQuery, EnrolledCourseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EnrolledCourseQuery, EnrolledCourseQueryVariables>(EnrolledCourseDocument, options);
      }
export function useEnrolledCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EnrolledCourseQuery, EnrolledCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EnrolledCourseQuery, EnrolledCourseQueryVariables>(EnrolledCourseDocument, options);
        }
export type EnrolledCourseQueryHookResult = ReturnType<typeof useEnrolledCourseQuery>;
export type EnrolledCourseLazyQueryHookResult = ReturnType<typeof useEnrolledCourseLazyQuery>;
export type EnrolledCourseQueryResult = Apollo.QueryResult<EnrolledCourseQuery, EnrolledCourseQueryVariables>;
export const OneSubUnitDocument = gql`
    query OneSubUnit($subId: Float!) {
  subunitOne(subId: $subId) {
    subName
    contentType
    content
    videoPath
    videoDescription
    createDate
    UnitId
  }
}
    `;

/**
 * __useOneSubUnitQuery__
 *
 * To run a query within a React component, call `useOneSubUnitQuery` and pass it any options that fit your needs.
 * When your component renders, `useOneSubUnitQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOneSubUnitQuery({
 *   variables: {
 *      subId: // value for 'subId'
 *   },
 * });
 */
export function useOneSubUnitQuery(baseOptions: Apollo.QueryHookOptions<OneSubUnitQuery, OneSubUnitQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OneSubUnitQuery, OneSubUnitQueryVariables>(OneSubUnitDocument, options);
      }
export function useOneSubUnitLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OneSubUnitQuery, OneSubUnitQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OneSubUnitQuery, OneSubUnitQueryVariables>(OneSubUnitDocument, options);
        }
export type OneSubUnitQueryHookResult = ReturnType<typeof useOneSubUnitQuery>;
export type OneSubUnitLazyQueryHookResult = ReturnType<typeof useOneSubUnitLazyQuery>;
export type OneSubUnitQueryResult = Apollo.QueryResult<OneSubUnitQuery, OneSubUnitQueryVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const IndividualCourseDocument = gql`
    query individualCourse($courseId: Float!) {
  individualCourse(courseId: $courseId) {
    courseId
    courseName
    courseDescription
    category
    coverImage
    timeEstimation
    level
    createDate
  }
}
    `;

/**
 * __useIndividualCourseQuery__
 *
 * To run a query within a React component, call `useIndividualCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useIndividualCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIndividualCourseQuery({
 *   variables: {
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useIndividualCourseQuery(baseOptions: Apollo.QueryHookOptions<IndividualCourseQuery, IndividualCourseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IndividualCourseQuery, IndividualCourseQueryVariables>(IndividualCourseDocument, options);
      }
export function useIndividualCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IndividualCourseQuery, IndividualCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IndividualCourseQuery, IndividualCourseQueryVariables>(IndividualCourseDocument, options);
        }
export type IndividualCourseQueryHookResult = ReturnType<typeof useIndividualCourseQuery>;
export type IndividualCourseLazyQueryHookResult = ReturnType<typeof useIndividualCourseLazyQuery>;
export type IndividualCourseQueryResult = Apollo.QueryResult<IndividualCourseQuery, IndividualCourseQueryVariables>;
export const InstructorCourseDocument = gql`
    query instructorCourse($creatorId: Float!) {
  instructorCourse(creatorId: $creatorId) {
    courseId
    courseName
    courseDescription
    category
    coverImage
    timeEstimation
    level
    createDate
  }
}
    `;

/**
 * __useInstructorCourseQuery__
 *
 * To run a query within a React component, call `useInstructorCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useInstructorCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInstructorCourseQuery({
 *   variables: {
 *      creatorId: // value for 'creatorId'
 *   },
 * });
 */
export function useInstructorCourseQuery(baseOptions: Apollo.QueryHookOptions<InstructorCourseQuery, InstructorCourseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InstructorCourseQuery, InstructorCourseQueryVariables>(InstructorCourseDocument, options);
      }
export function useInstructorCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InstructorCourseQuery, InstructorCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InstructorCourseQuery, InstructorCourseQueryVariables>(InstructorCourseDocument, options);
        }
export type InstructorCourseQueryHookResult = ReturnType<typeof useInstructorCourseQuery>;
export type InstructorCourseLazyQueryHookResult = ReturnType<typeof useInstructorCourseLazyQuery>;
export type InstructorCourseQueryResult = Apollo.QueryResult<InstructorCourseQuery, InstructorCourseQueryVariables>;
export const IsenrolledDocument = gql`
    query isenrolled($userId: Float!, $courseId: Float!) {
  enrolledCourseId(userId: $userId, courseId: $courseId)
}
    `;

/**
 * __useIsenrolledQuery__
 *
 * To run a query within a React component, call `useIsenrolledQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsenrolledQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsenrolledQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useIsenrolledQuery(baseOptions: Apollo.QueryHookOptions<IsenrolledQuery, IsenrolledQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsenrolledQuery, IsenrolledQueryVariables>(IsenrolledDocument, options);
      }
export function useIsenrolledLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsenrolledQuery, IsenrolledQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsenrolledQuery, IsenrolledQueryVariables>(IsenrolledDocument, options);
        }
export type IsenrolledQueryHookResult = ReturnType<typeof useIsenrolledQuery>;
export type IsenrolledLazyQueryHookResult = ReturnType<typeof useIsenrolledLazyQuery>;
export type IsenrolledQueryResult = Apollo.QueryResult<IsenrolledQuery, IsenrolledQueryVariables>;
export const IsPaidDocument = gql`
    query isPaid($courseId: Float!) {
  ispaid(courseId: $courseId) {
    payId
    paid
    cardnumber
  }
}
    `;

/**
 * __useIsPaidQuery__
 *
 * To run a query within a React component, call `useIsPaidQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsPaidQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsPaidQuery({
 *   variables: {
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useIsPaidQuery(baseOptions: Apollo.QueryHookOptions<IsPaidQuery, IsPaidQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsPaidQuery, IsPaidQueryVariables>(IsPaidDocument, options);
      }
export function useIsPaidLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsPaidQuery, IsPaidQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsPaidQuery, IsPaidQueryVariables>(IsPaidDocument, options);
        }
export type IsPaidQueryHookResult = ReturnType<typeof useIsPaidQuery>;
export type IsPaidLazyQueryHookResult = ReturnType<typeof useIsPaidLazyQuery>;
export type IsPaidQueryResult = Apollo.QueryResult<IsPaidQuery, IsPaidQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    user {
      id
      email
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $role: String!, $name: String!) {
  register(email: $email, password: $password, role: $role, name: $name)
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      role: // value for 'role'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SubUnitDocument = gql`
    query SubUnit($unitId: Float!) {
  subunit(unitId: $unitId) {
    subId
    subName
    contentType
    content
    videoPath
    createDate
    UnitId
  }
}
    `;

/**
 * __useSubUnitQuery__
 *
 * To run a query within a React component, call `useSubUnitQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubUnitQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubUnitQuery({
 *   variables: {
 *      unitId: // value for 'unitId'
 *   },
 * });
 */
export function useSubUnitQuery(baseOptions: Apollo.QueryHookOptions<SubUnitQuery, SubUnitQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SubUnitQuery, SubUnitQueryVariables>(SubUnitDocument, options);
      }
export function useSubUnitLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubUnitQuery, SubUnitQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SubUnitQuery, SubUnitQueryVariables>(SubUnitDocument, options);
        }
export type SubUnitQueryHookResult = ReturnType<typeof useSubUnitQuery>;
export type SubUnitLazyQueryHookResult = ReturnType<typeof useSubUnitLazyQuery>;
export type SubUnitQueryResult = Apollo.QueryResult<SubUnitQuery, SubUnitQueryVariables>;
export const UnenrollDocument = gql`
    mutation unenroll($userId: Float!, $courseId: Float!) {
  unenroll(userId: $userId, courseId: $courseId)
}
    `;
export type UnenrollMutationFn = Apollo.MutationFunction<UnenrollMutation, UnenrollMutationVariables>;

/**
 * __useUnenrollMutation__
 *
 * To run a mutation, you first call `useUnenrollMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnenrollMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unenrollMutation, { data, loading, error }] = useUnenrollMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useUnenrollMutation(baseOptions?: Apollo.MutationHookOptions<UnenrollMutation, UnenrollMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnenrollMutation, UnenrollMutationVariables>(UnenrollDocument, options);
      }
export type UnenrollMutationHookResult = ReturnType<typeof useUnenrollMutation>;
export type UnenrollMutationResult = Apollo.MutationResult<UnenrollMutation>;
export type UnenrollMutationOptions = Apollo.BaseMutationOptions<UnenrollMutation, UnenrollMutationVariables>;
export const UnitDocument = gql`
    query unit($courseId: Float!) {
  courseunit(courseId: $courseId) {
    UnitId
    unitName
    unitDescription
    courseId
  }
}
    `;

/**
 * __useUnitQuery__
 *
 * To run a query within a React component, call `useUnitQuery` and pass it any options that fit your needs.
 * When your component renders, `useUnitQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUnitQuery({
 *   variables: {
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useUnitQuery(baseOptions: Apollo.QueryHookOptions<UnitQuery, UnitQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UnitQuery, UnitQueryVariables>(UnitDocument, options);
      }
export function useUnitLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UnitQuery, UnitQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UnitQuery, UnitQueryVariables>(UnitDocument, options);
        }
export type UnitQueryHookResult = ReturnType<typeof useUnitQuery>;
export type UnitLazyQueryHookResult = ReturnType<typeof useUnitLazyQuery>;
export type UnitQueryResult = Apollo.QueryResult<UnitQuery, UnitQueryVariables>;
export const UpdateCourseDocument = gql`
    mutation updateCourse($courseId: Float!, $courseName: String!, $courseDes: String!, $category: String!, $timeEst: String!, $level: String!, $organization: String!, $coverImage: String!) {
  updateCourse(
    courseId: $courseId
    CourseName: $courseName
    CourseDescription: $courseDes
    category: $category
    timeEst: $timeEst
    level: $level
    organization: $organization
    coverImage: $coverImage
  )
}
    `;
export type UpdateCourseMutationFn = Apollo.MutationFunction<UpdateCourseMutation, UpdateCourseMutationVariables>;

/**
 * __useUpdateCourseMutation__
 *
 * To run a mutation, you first call `useUpdateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseMutation, { data, loading, error }] = useUpdateCourseMutation({
 *   variables: {
 *      courseId: // value for 'courseId'
 *      courseName: // value for 'courseName'
 *      courseDes: // value for 'courseDes'
 *      category: // value for 'category'
 *      timeEst: // value for 'timeEst'
 *      level: // value for 'level'
 *      organization: // value for 'organization'
 *      coverImage: // value for 'coverImage'
 *   },
 * });
 */
export function useUpdateCourseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCourseMutation, UpdateCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCourseMutation, UpdateCourseMutationVariables>(UpdateCourseDocument, options);
      }
export type UpdateCourseMutationHookResult = ReturnType<typeof useUpdateCourseMutation>;
export type UpdateCourseMutationResult = Apollo.MutationResult<UpdateCourseMutation>;
export type UpdateCourseMutationOptions = Apollo.BaseMutationOptions<UpdateCourseMutation, UpdateCourseMutationVariables>;
export const UpdateunitdetailDocument = gql`
    mutation updateunitdetail($unitId: Float!, $unitName: String!, $unitDes: String!) {
  updateUnit(unitId: $unitId, unitName: $unitName, unitDescription: $unitDes)
}
    `;
export type UpdateunitdetailMutationFn = Apollo.MutationFunction<UpdateunitdetailMutation, UpdateunitdetailMutationVariables>;

/**
 * __useUpdateunitdetailMutation__
 *
 * To run a mutation, you first call `useUpdateunitdetailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateunitdetailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateunitdetailMutation, { data, loading, error }] = useUpdateunitdetailMutation({
 *   variables: {
 *      unitId: // value for 'unitId'
 *      unitName: // value for 'unitName'
 *      unitDes: // value for 'unitDes'
 *   },
 * });
 */
export function useUpdateunitdetailMutation(baseOptions?: Apollo.MutationHookOptions<UpdateunitdetailMutation, UpdateunitdetailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateunitdetailMutation, UpdateunitdetailMutationVariables>(UpdateunitdetailDocument, options);
      }
export type UpdateunitdetailMutationHookResult = ReturnType<typeof useUpdateunitdetailMutation>;
export type UpdateunitdetailMutationResult = Apollo.MutationResult<UpdateunitdetailMutation>;
export type UpdateunitdetailMutationOptions = Apollo.BaseMutationOptions<UpdateunitdetailMutation, UpdateunitdetailMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($userId: Float!, $name: String!, $email: String!, $profileimage: String!, $aboutme: String!, $age: String!) {
  updateUser(
    userId: $userId
    name: $name
    email: $email
    profileImage: $profileimage
    aboutme: $aboutme
    age: $age
  )
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      profileimage: // value for 'profileimage'
 *      aboutme: // value for 'aboutme'
 *      age: // value for 'age'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UserprofileDocument = gql`
    query userprofile($userId: Float!) {
  usersid(userId: $userId) {
    id
    name
    email
    profileimage
    role
    age
    aboutme
  }
}
    `;

/**
 * __useUserprofileQuery__
 *
 * To run a query within a React component, call `useUserprofileQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserprofileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserprofileQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserprofileQuery(baseOptions: Apollo.QueryHookOptions<UserprofileQuery, UserprofileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserprofileQuery, UserprofileQueryVariables>(UserprofileDocument, options);
      }
export function useUserprofileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserprofileQuery, UserprofileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserprofileQuery, UserprofileQueryVariables>(UserprofileDocument, options);
        }
export type UserprofileQueryHookResult = ReturnType<typeof useUserprofileQuery>;
export type UserprofileLazyQueryHookResult = ReturnType<typeof useUserprofileLazyQuery>;
export type UserprofileQueryResult = Apollo.QueryResult<UserprofileQuery, UserprofileQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    id
    email
    role
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;