import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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

export type Profile = IProfile & {
  __typename?: 'Profile';
  profileId: Scalars['ID'];
  description: Scalars['String'];
  createDate: Scalars['DateTime'];
  updateDate: Scalars['DateTime'];
};


export type Post = IPost & {
  __typename?: 'Post';
  postId: Scalars['ID'];
  title: Scalars['String'];
  content: Scalars['String'];
  createDate: Scalars['DateTime'];
  updateDate: Scalars['DateTime'];
};

export type User = IUser & {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  createDate: Scalars['DateTime'];
  profile?: Maybe<Profile>;
  posts?: Maybe<Array<Post>>;
  updateDate: Scalars['DateTime'];
};

export type PrismaSample = {
  __typename?: 'PrismaSample';
  id: Scalars['ID'];
  version: Scalars['String'];
  createdAt: Scalars['DateTime'];
};

export type IProfile = {
  profileId: Scalars['ID'];
  description: Scalars['String'];
  createDate: Scalars['DateTime'];
  updateDate: Scalars['DateTime'];
};

export type IPost = {
  postId: Scalars['ID'];
  title: Scalars['String'];
  content: Scalars['String'];
  createDate: Scalars['DateTime'];
  updateDate: Scalars['DateTime'];
};

export type IUser = {
  id: Scalars['ID'];
  name: Scalars['String'];
  createDate: Scalars['DateTime'];
  profile?: Maybe<Profile>;
  posts?: Maybe<Array<Post>>;
  updateDate: Scalars['DateTime'];
};

export type UpdateProfileInput = {
  id: Scalars['Int'];
};

export type DeleteProfileInput = {
  id: Scalars['Int'];
};

export type UserCreateInput = {
  name: Scalars['String'];
};

export type UserUpdateInput = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type UserPaginationInput = {
  offset: Scalars['Int'];
  take: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  PrismaSample: Array<PrismaSample>;
  GetProfileById: Profile;
  GetAllUsers: Array<User>;
  GetUserById?: Maybe<User>;
};


export type QueryGetProfileByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetAllUsersArgs = {
  pagination?: Maybe<UserPaginationInput>;
};


export type QueryGetUserByIdArgs = {
  id: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  UpdateProfile: Profile;
  CreateUser?: Maybe<User>;
  UpdateUser?: Maybe<User>;
};


export type MutationUpdateProfileArgs = {
  updateParams: UpdateProfileInput;
};


export type MutationCreateUserArgs = {
  createParams: UserCreateInput;
};


export type MutationUpdateUserArgs = {
  updateParams: UserUpdateInput;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Profile: ResolverTypeWrapper<Profile>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Post: ResolverTypeWrapper<Post>;
  User: ResolverTypeWrapper<User>;
  PrismaSample: ResolverTypeWrapper<PrismaSample>;
  IProfile: ResolversTypes['Profile'];
  IPost: ResolversTypes['Post'];
  IUser: ResolversTypes['User'];
  UpdateProfileInput: UpdateProfileInput;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  DeleteProfileInput: DeleteProfileInput;
  UserCreateInput: UserCreateInput;
  UserUpdateInput: UserUpdateInput;
  UserPaginationInput: UserPaginationInput;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Profile: Profile;
  ID: Scalars['ID'];
  String: Scalars['String'];
  DateTime: Scalars['DateTime'];
  Post: Post;
  User: User;
  PrismaSample: PrismaSample;
  IProfile: ResolversParentTypes['Profile'];
  IPost: ResolversParentTypes['Post'];
  IUser: ResolversParentTypes['User'];
  UpdateProfileInput: UpdateProfileInput;
  Int: Scalars['Int'];
  DeleteProfileInput: DeleteProfileInput;
  UserCreateInput: UserCreateInput;
  UserUpdateInput: UserUpdateInput;
  UserPaginationInput: UserPaginationInput;
  Query: {};
  Mutation: {};
  Boolean: Scalars['Boolean'];
};

export type ProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']> = {
  profileId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updateDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  postId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updateDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  posts?: Resolver<Maybe<Array<ResolversTypes['Post']>>, ParentType, ContextType>;
  updateDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PrismaSampleResolvers<ContextType = any, ParentType extends ResolversParentTypes['PrismaSample'] = ResolversParentTypes['PrismaSample']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['IProfile'] = ResolversParentTypes['IProfile']> = {
  __resolveType: TypeResolveFn<'Profile', ParentType, ContextType>;
  profileId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updateDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type IPostResolvers<ContextType = any, ParentType extends ResolversParentTypes['IPost'] = ResolversParentTypes['IPost']> = {
  __resolveType: TypeResolveFn<'Post', ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updateDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type IUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['IUser'] = ResolversParentTypes['IUser']> = {
  __resolveType: TypeResolveFn<'User', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  posts?: Resolver<Maybe<Array<ResolversTypes['Post']>>, ParentType, ContextType>;
  updateDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  PrismaSample?: Resolver<Array<ResolversTypes['PrismaSample']>, ParentType, ContextType>;
  GetProfileById?: Resolver<ResolversTypes['Profile'], ParentType, ContextType, RequireFields<QueryGetProfileByIdArgs, 'id'>>;
  GetAllUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetAllUsersArgs, never>>;
  GetUserById?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, 'id'>>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  UpdateProfile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType, RequireFields<MutationUpdateProfileArgs, 'updateParams'>>;
  CreateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'createParams'>>;
  UpdateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'updateParams'>>;
};

export type Resolvers<ContextType = any> = {
  Profile?: ProfileResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Post?: PostResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  PrismaSample?: PrismaSampleResolvers<ContextType>;
  IProfile?: IProfileResolvers<ContextType>;
  IPost?: IPostResolvers<ContextType>;
  IUser?: IUserResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
