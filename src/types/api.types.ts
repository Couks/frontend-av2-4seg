export interface ApiEndpoints {
  auth: {
    login: {
      url: "/api/login";
      method: "POST";
      body: {
        email: string;
        password: string;
      };
      response: {
        accessToken: string;
        refreshToken: string;
      };
    };
    logout: {
      url: "/api/logout";
      method: "POST";
      headers: {
        Authorization: string;
      };
      response: {
        message: string;
      };
    };
  };
  user: {
    register: {
      url: "/api/user/register";
      method: "POST";
      body: {
        email: string;
        password: string;
        name: string;
      };
    };
    enable2FA: {
      url: "/api/user/2fa/enable";
      method: "POST";
      headers: {
        Authorization: string;
      };
      response: {
        secret: string;
        qrCode: string;
      };
    };
    confirm2FA: {
      url: "/api/user/2fa/confirm";
      method: "POST";
      headers: {
        Authorization: string;
      };
      body: {
        code: string;
      };
    };
    me: {
      url: "/api/user/me";
      method: "GET";
      headers: {
        Authorization: string;
      };
      response: {
        id: number;
        email: string;
        name: string;
        isVerified: boolean;
        twoFactorEnabled: boolean;
        createdAt: string;
      };
    };
  };
  security: {
    logs: {
      url: "/api/security/logs";
      method: "GET";
      headers: {
        Authorization: string;
      };
      query: {
        page?: number;
        limit?: number;
        action?: string;
        status?: string;
      };
      response: {
        logs: Array<{
          id: number;
          action: string;
          status: string;
          ipAddress: string;
          userAgent: string;
          createdAt: string;
        }>;
        pagination: {
          page: number;
          limit: number;
          total: number;
          totalPages: number;
        };
      };
    };
  };
  token: {
    refresh: {
      url: "/api/token/refresh";
      method: "GET";
      headers: {
        Authorization: string;
      };
      response: {
        accessToken: string;
      };
    };
    validate: {
      url: "/api/token/validate";
      method: "POST";
      headers: {
        Authorization: string;
      };
      response: {
        valid: boolean;
        payload?: {
          sub: number;
          type: string;
          exp: number;
          iat: number;
        };
      };
    };
  };
}
