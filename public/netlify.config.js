export function redirects(redirects) {
  redirects.add({
    from: "/*",
    to: "/index.html",
    status: 200,
  });
}
