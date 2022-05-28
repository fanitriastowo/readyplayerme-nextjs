import type { User, Auth } from "firebase/auth";

export async function signInAnonymously() {
  return {
    uid: "",
    user: {
      emailVerified: true,
      isAnonymous: true,
      metadata: {},
      providerData: [],
      refreshToken: "",
      tenantId: "",
      delete: () => Promise.resolve(),
      getIdToken: () => Promise.resolve(""),
      getIdTokenResult: () =>
        Promise.resolve({
          authTime: "",
          expirationTime: "",
          issuedAtTime: "",
          signInProvider: "",
          signInSecondFactor: "",
          token: "",
          claims: {},
        }),
      reload: () => Promise.resolve(),
      toJSON: () => Promise.resolve({}),
      displayName: "",
      email: "",
      phoneNumber: "",
      photoURL: "",
      providerId: "",
      uid: "",
    },
    providerId: "",
    operationType: "signIn",
  };
}

export async function onAuthStateChanged(
  _: Auth,
  callback: (user: User | null) => void
) {
  const authUser = {
    emailVerified: true,
    isAnonymous: true,
    metadata: {},
    providerData: [],
    refreshToken: "",
    tenantId: "",
    delete: () => Promise.resolve(),
    getIdToken: () => Promise.resolve(""),
    getIdTokenResult: () =>
      Promise.resolve({
        authTime: "",
        expirationTime: "",
        issuedAtTime: "",
        signInProvider: "",
        signInSecondFactor: "",
        token: "",
        claims: {},
      }),
    reload: () => Promise.resolve(),
    toJSON: () => Promise.resolve({}),
    displayName: "",
    email: "",
    phoneNumber: "",
    photoURL: "",
    providerId: "",
    uid: "",
  };
  callback(authUser);
  return () => {};
}
export function getAuth() {
  return {} as Auth;
}
