# Learnings

## Week-1

#### 1. CORS:
- Browsers have one rule. 
- Javascript loaded from website A cannot read responses from website B, unless website B explicitly says "I'm okay with website A reading any responses."
- Why this rule exists ? Imagine you are logged into your bank at mybank.com in one tab. In another tab, you visit evilsite.com. Without this rule, evilsite's Javascript could secretly make request to mybank.com/transfer-money.
  And because you are logged in, your browser would send bank cokkies along.
  The bank server, seeing the cookies, would think YOU requested the transfer. Disaster.

- So browsers refuse to let JS on one origin read responses from another origin, by default.
- In our project http://localhost:5173/ , http://localhost:3000/ are two different origins.
- What does app.enableCors() does ? When your backend recieves a request, it adds a special header to its response: Access-Control-Allow-Origin: * . That header is the backend's way of saying "I'm fine being called by javascript from any website."

#### 2. Cookies:
- A cookie is a small piece of text the browser stores on behalf of a website. 
- Once stored, the browser automatically sends it back with every future request on that website.
- Concrete example:
    - You log into mybank.com. The bank's server verifies your password and sends back a response that includes something like : Set-Cookie: session_id=abc123xyz.
    - Your browser saves that cookie in its storage, tagged with "this belongs to mybank.com."
    - Five minutes later, you click on "View account balance." The browser makes a request to mybank.com/balance and automatically attaches Cookie: session_id=abc123xyz to the request.
    - The bank's server sees the cookie, looks up "abc123xyz" in its database, finds "this is Nikhitha's session," and shows you your balance.

- That's it. Cookies are the browser's way of remembering "I'm logged in" between page loads, without the user having to type their password every time.
- Why cookies exist: HTTP is stateless. *Every request is independent*. Without cookies, the server would have no way to know that two requests are from the same logged-in user. Cookies are the persistent thread that ties requests together.

- Things to know about cookies:
    - They're sent automatically by the browser. You don't have to do anything in JavaScript to send them; the browser handles it.
    - They're scoped to a domain. A cookie set by mybank.com only gets sent to mybank.com, never to other sites
    - They can hold session IDs (most common), preferences, tracking data, etc.
    - They have a max size of ~4KB each. Tiny.

**app.enableCors() with no arguments allows requests from any origin. That means any website's JavaScript, in anyone's browser, can call your backend and get a response.**
1. Restrict CORS to only allow your frontend.
```js
app.enableCors({
  origin: 'https://prep-tarcker-project.netlify.app'
})
```
Now only your Netlify frontend (in someone's browser) can call your backend. evilsite.com calls would get blocked by the browser before they even reach you.

*But this only stops browser-based attacks. Anyone with curl can still hit your backend, because CORS doesn't apply outside browsers.*

2. Add authentication : There are two common approaches fro auth -- Cookies, JWT Tokens stored in local storage.

- CORS = browser-level defense (stops malicious websites)
- Auth (JWT) = universal defense (stops anyone without credentials)

