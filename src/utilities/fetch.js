const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));

module.exports.fetch = async ({ url, route, data, options }) => {
  try {
    const req = await fetch(`${url}/${route.startsWith("/") ? route.slice(1) : route}`, {
      method: data.method || "get",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        ...data.headers,
      },
      body: typeof data.body === "object" ? JSON.stringify(data.body) : data.body,
    });
    const res = { status: req.status, body: await req.text() };
    if (!res.body) {
      delete res.body;
    } else {
      if (options?.attemptToConvertJson || res.status !== 200) {
        try {
          res.body = JSON.parse(res.body);
        } catch(_err) {}
      } else {
        res.body = {
          content: res.body,
        };
      }
    }
    return res;
  } catch(err) {
    console.error(err);
    return { status: 0 };
  }
};
