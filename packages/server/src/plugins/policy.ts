import Hapi from "@hapi/hapi";
import Boom from "@hapi/boom";
import Path from "path";
import Fs from "fs";
import __memoize from "lodash/memoize";
import __isError from "lodash/isError";
import __isPlainObject from "lodash/isPlainObject";
import __forEach from "lodash/forEach";
import __chain from "lodash/chain";
import __zipObject from "lodash/zipObject";
import __keys from "lodash/keys";
import __values from "lodash/values";

type ApplyPointTypes =
  | "onRequest"
  | "onPreAuth"
  | "onPostAuth"
  | "onPreHandler"
  | "onPostHandler"
  | "onPreResponse";

type HandlersTypes = {
  [key in ApplyPointTypes]?: any;
};

interface IPolicy {
  applyPoint: ApplyPointTypes;
  [s: string]: any;
}

export interface IPoliciesPluginOptions {
  policyDirectory: string;
  defaultApplyPoint?: ApplyPointTypes;
  ignoreDuplicates?: boolean;
}

interface IRawPolicies {
  [s: string]: IPolicy;
}

interface ISetHandlers extends HandlersTypes {
  [s: string]: boolean;
}

interface IData extends HandlersTypes {
  names: string[];
  rawPolicies: IRawPolicies;
  setHandlers: ISetHandlers;
  [s: string]: any;
}

const _applyPoints: ApplyPointTypes[] = [
  "onRequest",
  "onPreAuth",
  "onPostAuth",
  "onPreHandler",
  "onPostHandler",
  "onPreResponse",
];

const data: IData = {
  names: [],
  rawPolicies: {},
  setHandlers: {},
};

/* adding arrays, to hold the policies */
_applyPoints.forEach((applyPoint) => {
  data[applyPoint] = {};
});

const hasValidApplyPoint = (policy: IPolicy): boolean => {
  return !policy.applyPoint || _applyPoints.indexOf(policy.applyPoint) !== -1;
};

const determineAggregateApplyPoint = __memoize((policyNames: string[]) => {
  const firstPolicy = policyNames[0];

  let applyPoint;
  for (let i = 0; i < _applyPoints.length; ++i) {
    if (
      !applyPoint &&
      Object.keys(data[_applyPoints[i]]).indexOf(firstPolicy) !== -1
    ) {
      applyPoint = _applyPoints[i];
    }
  }
  return applyPoint;
});

const handlers: HandlersTypes = {};

const negotiateError = (err: Error) => {
  if (__isError(err)) {
    if (!Boom.isBoom(err)) {
      Boom.boomify(err, {
        statusCode: 403,
        override: false,
      });
    }

    return err;
  }

  return Boom.forbidden(err);
};

const runPolicies = async (
  policiesToRun: any[],
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) => {
  for (const policy of policiesToRun) {
    try {
      const policyResult = await policy(request, h);
      if (policyResult !== h.continue) {
        return policyResult;
      }
    } catch (error) {
      throw negotiateError(error);
    }
  }

  return h.continue;
};

_applyPoints.forEach((applyPoint: ApplyPointTypes) => {
  handlers[applyPoint] = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit
  ) => {
    const applyPointPolicies = data[applyPoint];
    console.log(
      "🚀 ~ file: policy.ts ~ line 160 ~ _applyPoints.forEach ~ applyPoint",
      applyPoint
    );
    console.log(
      "🚀 ~ file: policy.ts ~ line 126 ~ _applyPoints.forEach ~ applyPointPolicies",
      applyPointPolicies
    );
    const routePolicies: any[] = request.route.settings.plugins?.policies;
    console.log(
      "🚀 ~ file: policy.ts ~ line 128 ~ _applyPoints.forEach ~ routePolicies",
      routePolicies
    );

    if (!routePolicies) {
      return h.continue;
    }

    const policiesToRun = routePolicies.reduce(
      (tempList: any[], routePolicy: any) => {
        let aggregateApplyPoint;

        if (Array.isArray(routePolicy)) {
          aggregateApplyPoint = determineAggregateApplyPoint(routePolicy);
          if (aggregateApplyPoint === applyPoint) {
            routePolicy = parallel.apply(this, routePolicy);
          } else {
            routePolicy = null;
          }
        }

        if (typeof routePolicy === "function") {
          if (!hasValidApplyPoint(routePolicy)) {
            throw Boom.badImplementation(
              "Trying to use incorrect applyPoint for the dynamic policy: " +
                routePolicy.applyPoint
            );
          }

          if (!aggregateApplyPoint && routePolicy.runs) {
            aggregateApplyPoint = determineAggregateApplyPoint(
              routePolicy.runs
            );
          }

          const effectiveApplyPoint =
            routePolicy.applyPoint || aggregateApplyPoint;

          if (effectiveApplyPoint === applyPoint) {
            tempList.push(routePolicy);
          }
        } else if (typeof routePolicy === "string") {
          // Look for missing policies.  Probably due to misspelling.
          if (data.names.indexOf(routePolicy) !== -1) {
            throw Boom.notImplemented("Missing policy: " + routePolicy);
          }

          if (applyPointPolicies[routePolicy]) {
            tempList.push(applyPointPolicies[applyPoint]);
          }
        } else if (routePolicy !== null) {
          throw Boom.badImplementation(
            "Policy not specified by name or by function."
          );
        }

        return tempList;
      },
      []
    );

    console.log(
      "🚀 ~ file: policy.ts ~ line 235 ~ _applyPoints.forEach ~ policiesToRun",
      policiesToRun
    );
    return await runPolicies(policiesToRun, request, h);
  };
});

const hasPolicy = (policyName: string): boolean => {
  return data.names.indexOf(policyName) !== -1;
};

const addPolicy = (
  policyName: string,
  policy: IPolicy,
  server: Hapi.Server,
  options: IPoliciesPluginOptions
) => {
  // Does this policy already exist
  if (hasPolicy(policyName)) {
    if (options.ignoreDuplicates) {
      return;
    }

    throw new Error("Trying to add a duplicate policy: " + policyName);
  }

  // Check if the apply point is correct
  if (!hasValidApplyPoint(policy)) {
    throw new Error(
      "Trying to set incorrect applyPoint for the policy: " + policy.applyPoint
    );
  }

  const applyPoint = policy.applyPoint || options.defaultApplyPoint;

  server.log(["info"], "Adding a new policy called " + policyName);

  data[applyPoint][policyName] = policy;
  data.rawPolicies[policyName] = policy;
  data.names.push(policyName);
  console.log("🚀 ~ file: policy.ts ~ line 282 ~ data", data);
  // connect the handler if this is the first policy
  if (!data.setHandlers[applyPoint]) {
    server.ext(applyPoint, handlers[applyPoint]);
    data.setHandlers[applyPoint] = true;
  }
};

const policiesPlugin: Hapi.Plugin<IPoliciesPluginOptions> = {
  name: "policies",
  pkg: {
    name: "policies",
    version: "1.0.0",
  },
  register: async function (
    server: Hapi.Server,
    options: IPoliciesPluginOptions
  ) {
    const policyFiles = Fs.readdirSync(options.policyDirectory);
    if (!policyFiles?.length) {
      return;
    }

    const re = /(.+)\.ts$/;

    for (const policyFile of policyFiles) {
      loadPolicyFile(policyFile);
    }

    function loadPolicyFile(filename: string) {
      const match = filename.match(re);
      if (match) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const policyData = require(Path.join(
          options.policyDirectory,
          filename
        ));

        try {
          if (__isPlainObject(policyData)) {
            __forEach(policyData, (policy, policyName) =>
              addPolicy(policyName, policy, server, options)
            );
          } else {
            addPolicy(match[1], policyData, server, options);
          }
        } catch (error) {
          server.log(["error"], error.message);
          throw error;
        }
      }
    }
  },
};

export default policiesPlugin;

/* Policy aggregation tools */
function parallel(...params: any) {
  if (!params?.length) {
    throw new Error("Requires at least one argument.");
  }

  const args = Array.prototype.slice.call(params);

  // This error aggregator is used by default, giving priority to error responses
  // by the policies' listed order.
  const defaultErrorHandler = (ranPolicies: any, results: any) => {
    for (let i = 0; i < ranPolicies.length; ++i) {
      const result = results[ranPolicies[i]];
      if (result.err) {
        throw result.err;
      }
    }
  };

  // Determine the error handler and policies we're using
  let errorHandler: any;
  let policyNames: any;

  if (typeof args[args.length - 1] === "function") {
    errorHandler = args[args.length - 1];
    policyNames = args.slice(0, -1);
  } else {
    errorHandler = defaultErrorHandler;
    policyNames = args;
  }

  const managePolicy = async (
    policy: any,
    request: Hapi.Request,
    h: Hapi.ResponseToolkit
  ) => {
    try {
      const result = await policy(request, h);

      return { status: "ok", result };
    } catch (error) {
      return { status: "error", err: error };
    }
  };

  // Aggregate policy
  const aggregatePolicy = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit
  ) => {
    const policies = __chain(data.rawPolicies)
      .pick(policyNames)
      .mapValues((policy) => managePolicy(policy, request, h))
      .value();
    const results = __zipObject(
      __keys(policies),
      await Promise.all(__values(policies))
    );

    errorHandler(policyNames, results);

    return h.continue;
  };

  aggregatePolicy.runs = policyNames;

  return aggregatePolicy;
}
