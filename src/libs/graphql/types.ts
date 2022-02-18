export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: number;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Time: Date | string;
  Upload: any;
};

export enum Answer {
  A = 'a',
  B = 'b',
  C = 'c',
  D = 'd'
}

export type Mutation = {
  createProfession?: Maybe<Profession>;
  createQualification?: Maybe<Qualification>;
  createQuestion?: Maybe<Question>;
  createUser?: Maybe<User>;
  deleteProfessions?: Maybe<Array<Profession>>;
  deleteQualifications?: Maybe<Array<Qualification>>;
  deleteQuestions?: Maybe<Array<Question>>;
  deleteUsers?: Maybe<Array<User>>;
  signIn?: Maybe<UserWithToken>;
  updateManyUsers?: Maybe<Array<User>>;
  updateProfession?: Maybe<Profession>;
  updateQualification?: Maybe<Qualification>;
  updateQuestion?: Maybe<Question>;
  updateUser?: Maybe<User>;
};


export type MutationCreateProfessionArgs = {
  input: ProfessionInput;
};


export type MutationCreateQualificationArgs = {
  input: QualificationInput;
};


export type MutationCreateQuestionArgs = {
  input: QuestionInput;
};


export type MutationCreateUserArgs = {
  input: UserInput;
};


export type MutationDeleteProfessionsArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationDeleteQualificationsArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationDeleteQuestionsArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationDeleteUsersArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationSignInArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  staySignedIn?: InputMaybe<Scalars['Boolean']>;
};


export type MutationUpdateManyUsersArgs = {
  ids: Array<Scalars['ID']>;
  input: UpdateManyUsersInput;
};


export type MutationUpdateProfessionArgs = {
  id: Scalars['ID'];
  input: ProfessionInput;
};


export type MutationUpdateQualificationArgs = {
  id: Scalars['ID'];
  input: QualificationInput;
};


export type MutationUpdateQuestionArgs = {
  id: Scalars['ID'];
  input: QuestionInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  input: UserInput;
};

export type Profession = {
  createdAt: Scalars['Time'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  qualifications: Array<Qualification>;
  slug: Scalars['String'];
};

export type ProfessionFilter = {
  createdAt?: InputMaybe<Scalars['Time']>;
  createdAtGT?: InputMaybe<Scalars['Time']>;
  createdAtGTE?: InputMaybe<Scalars['Time']>;
  createdAtLT?: InputMaybe<Scalars['Time']>;
  createdAtLTE?: InputMaybe<Scalars['Time']>;
  descriptionIEQ?: InputMaybe<Scalars['String']>;
  descriptionMATCH?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Array<Scalars['ID']>>;
  idNEQ?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Array<Scalars['String']>>;
  nameIEQ?: InputMaybe<Scalars['String']>;
  nameMATCH?: InputMaybe<Scalars['String']>;
  nameNEQ?: InputMaybe<Array<Scalars['String']>>;
  qualificationID?: InputMaybe<Array<Scalars['ID']>>;
  slug?: InputMaybe<Array<Scalars['String']>>;
  slugNEQ?: InputMaybe<Array<Scalars['String']>>;
};

export type ProfessionInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type ProfessionList = {
  items?: Maybe<Array<Profession>>;
  total: Scalars['Int'];
};

export type Qualification = {
  code: Scalars['String'];
  createdAt: Scalars['Time'];
  description?: Maybe<Scalars['String']>;
  formula?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type QualificationFilter = {
  code?: InputMaybe<Array<Scalars['String']>>;
  codeIEQ?: InputMaybe<Scalars['String']>;
  codeMATCH?: InputMaybe<Scalars['String']>;
  codeNEQ?: InputMaybe<Array<Scalars['String']>>;
  createdAt?: InputMaybe<Scalars['Time']>;
  createdAtGT?: InputMaybe<Scalars['Time']>;
  createdAtGTE?: InputMaybe<Scalars['Time']>;
  createdAtLT?: InputMaybe<Scalars['Time']>;
  createdAtLTE?: InputMaybe<Scalars['Time']>;
  descriptionIEQ?: InputMaybe<Scalars['String']>;
  descriptionMATCH?: InputMaybe<Scalars['String']>;
  formula?: InputMaybe<Array<Scalars['String']>>;
  formulaNEQ?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<Array<Scalars['ID']>>;
  idNEQ?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Array<Scalars['String']>>;
  nameIEQ?: InputMaybe<Scalars['String']>;
  nameMATCH?: InputMaybe<Scalars['String']>;
  nameNEQ?: InputMaybe<Array<Scalars['String']>>;
  or?: InputMaybe<QualificationFilterOr>;
  professionID?: InputMaybe<Array<Scalars['Int']>>;
  slug?: InputMaybe<Array<Scalars['String']>>;
  slugNEQ?: InputMaybe<Array<Scalars['String']>>;
};

export type QualificationFilterOr = {
  codeIEQ?: InputMaybe<Scalars['String']>;
  codeMatch?: InputMaybe<Scalars['String']>;
  nameIEQ?: InputMaybe<Scalars['String']>;
  nameMatch?: InputMaybe<Scalars['String']>;
};

export type QualificationInput = {
  associateProfession?: InputMaybe<Array<Scalars['Int']>>;
  code?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  dissociateProfession?: InputMaybe<Array<Scalars['Int']>>;
  formula?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type QualificationList = {
  items?: Maybe<Array<Qualification>>;
  total: Scalars['Int'];
};

export type Query = {
  generateTest?: Maybe<Array<Question>>;
  me?: Maybe<User>;
  profession?: Maybe<Profession>;
  professions: ProfessionList;
  qualification?: Maybe<Qualification>;
  qualifications: QualificationList;
  questions: QuestionList;
  similarQualifications: QualificationList;
  user?: Maybe<User>;
  users: UserList;
};


export type QueryGenerateTestArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  qualificationIDs: Array<Scalars['ID']>;
};


export type QueryProfessionArgs = {
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryProfessionsArgs = {
  filter?: InputMaybe<ProfessionFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
};


export type QueryQualificationArgs = {
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryQualificationsArgs = {
  filter?: InputMaybe<QualificationFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
};


export type QueryQuestionsArgs = {
  filter?: InputMaybe<QuestionFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
};


export type QuerySimilarQualificationsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  qualificationID: Scalars['ID'];
  sort?: InputMaybe<Array<Scalars['String']>>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  filter?: InputMaybe<UserFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
};

export type Question = {
  answerA?: Maybe<Scalars['String']>;
  answerAImage?: Maybe<Scalars['String']>;
  answerB?: Maybe<Scalars['String']>;
  answerBImage?: Maybe<Scalars['String']>;
  answerC?: Maybe<Scalars['String']>;
  answerCImage?: Maybe<Scalars['String']>;
  answerD?: Maybe<Scalars['String']>;
  answerDImage?: Maybe<Scalars['String']>;
  content: Scalars['String'];
  correctAnswer: Answer;
  createdAt: Scalars['Time'];
  explanation?: Maybe<Scalars['String']>;
  from?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  qualification?: Maybe<Qualification>;
  updatedAt: Scalars['Time'];
};

export type QuestionFilter = {
  contentIEQ?: InputMaybe<Scalars['String']>;
  contentMATCH?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Time']>;
  createdAtGT?: InputMaybe<Scalars['Time']>;
  createdAtGTE?: InputMaybe<Scalars['Time']>;
  createdAtLT?: InputMaybe<Scalars['Time']>;
  createdAtLTE?: InputMaybe<Scalars['Time']>;
  from?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<Array<Scalars['ID']>>;
  idNEQ?: InputMaybe<Array<Scalars['ID']>>;
  qualificationFilter?: InputMaybe<QualificationFilter>;
  qualificationID?: InputMaybe<Array<Scalars['Int']>>;
  qualificationIDNEQ?: InputMaybe<Array<Scalars['Int']>>;
};

export type QuestionInput = {
  answerA?: InputMaybe<Scalars['String']>;
  answerAImage?: InputMaybe<Scalars['Upload']>;
  answerB?: InputMaybe<Scalars['String']>;
  answerBImage?: InputMaybe<Scalars['Upload']>;
  answerC?: InputMaybe<Scalars['String']>;
  answerCImage?: InputMaybe<Scalars['Upload']>;
  answerD?: InputMaybe<Scalars['String']>;
  answerDImage?: InputMaybe<Scalars['Upload']>;
  content?: InputMaybe<Scalars['String']>;
  correctAnswer?: InputMaybe<Answer>;
  deleteAnswerAImage?: InputMaybe<Scalars['Boolean']>;
  deleteAnswerBImage?: InputMaybe<Scalars['Boolean']>;
  deleteAnswerCImage?: InputMaybe<Scalars['Boolean']>;
  deleteAnswerDImage?: InputMaybe<Scalars['Boolean']>;
  deleteImage?: InputMaybe<Scalars['Boolean']>;
  explanation?: InputMaybe<Scalars['String']>;
  from?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['Upload']>;
  qualificationID?: InputMaybe<Scalars['Int']>;
};

export type QuestionList = {
  items?: Maybe<Array<Question>>;
  total: Scalars['Int'];
};

export enum Role {
  Admin = 'admin',
  User = 'user'
}

export type UpdateManyUsersInput = {
  activated?: InputMaybe<Scalars['Boolean']>;
  role?: InputMaybe<Role>;
};

export type User = {
  activated: Scalars['Boolean'];
  createdAt: Scalars['Time'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['ID'];
  role: Role;
};

export type UserFilter = {
  activated?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['Time']>;
  createdAtGT?: InputMaybe<Scalars['Time']>;
  createdAtGTE?: InputMaybe<Scalars['Time']>;
  createdAtLT?: InputMaybe<Scalars['Time']>;
  createdAtLTE?: InputMaybe<Scalars['Time']>;
  displayName?: InputMaybe<Array<Scalars['String']>>;
  displayNameIEQ?: InputMaybe<Scalars['String']>;
  displayNameMATCH?: InputMaybe<Scalars['String']>;
  displayNameNEQ?: InputMaybe<Array<Scalars['String']>>;
  email?: InputMaybe<Array<Scalars['String']>>;
  emailIEQ?: InputMaybe<Scalars['String']>;
  emailMATCH?: InputMaybe<Scalars['String']>;
  emailNEQ?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<Array<Scalars['ID']>>;
  idNEQ?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<UserFilterOr>;
  role?: InputMaybe<Array<Role>>;
  roleNEQ?: InputMaybe<Array<Role>>;
};

export type UserFilterOr = {
  displayNameIEQ?: InputMaybe<Scalars['String']>;
  displayNameMATCH?: InputMaybe<Scalars['String']>;
  emailIEQ?: InputMaybe<Scalars['String']>;
  emailMATCH?: InputMaybe<Scalars['String']>;
};

export type UserInput = {
  activated?: InputMaybe<Scalars['Boolean']>;
  displayName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Role>;
};

export type UserList = {
  items?: Maybe<Array<User>>;
  total: Scalars['Int'];
};

export type UserWithToken = {
  token: Scalars['String'];
  user: User;
};
