import Hapi from "@hapi/hapi";

export const failAction = (
  _request: Hapi.Request,
  _h: Hapi.ResponseToolkit,
  err: Error | undefined
) => {
  // show validation errors to user https://github.com/hapijs/hapi/issues/3706
  throw err;
};
