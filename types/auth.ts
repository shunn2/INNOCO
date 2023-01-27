export interface SignUpPayload {
  userLoginId: string;
  userLoginPw: string;
  userEmail: string;
  userName: string;
  userProfileUrl: string;
}

export interface SignInPayload {
  userLoginId: string;
  userLoginPw: string;
}
