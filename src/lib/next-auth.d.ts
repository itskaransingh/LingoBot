import "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;
  }

  interface User {
    id: string;
    username?: string;
    langtolearn: string;
    lang: string;
    botname: string;
    isMalebot: boolean;
    isSetupComplete: boolean;
  }
}
