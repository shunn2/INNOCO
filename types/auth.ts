export interface SignUpPayload {
  memberLoginId: string;
  memberLoginPw: string;
  memberEmail: string;
  memberName: string;
  memberProfileUrl: string;
}

export interface SignInPayload {
  memberLoginId: string;
  memberLoginPw: string;
}
