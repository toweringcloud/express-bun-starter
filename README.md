# bun-express-starter

bun based express web app using mongodb and pug

## how to run

### setup

- install latest bun runtime

```sh
$ curl -fsSL https://bun.sh/install | bash
bun was installed successfully to ~/.bun/bin/bun

$ bun -v
1.2.15
```

### configure

- install packages with bun

```sh
$ bun init -y
$ bun i
```

- create runtime variables

```sh
$ cat .env
API_PORT_NO=5000
COOKIE_SECRET={YOUR_COOKIE_SECRET}
DB_URL=mongodb://127.0.0.1:27017/movie
GH_API_URL=https://api.github.com
GH_AUTH_URL=https://github.com/login/oauth
GH_CLIENT_ID={YOUR_GITHUB_CLIENT_ID}
GH_CLIENT_SECRET={YOUR_GITHUB_CLIENT_SECRET}
```

### launch

- run bun app with development mode

```sh
$ bun dev
```

### test

- download sample media file
  - [Pexcel](https://www.pexels.com)
  - [Others](https://www.sample-videos.com)
