create table if not exists users (
    id          bigserial primary key,
    username    text unique not null,
    password_hash    text not null,
    score       integer default 0,
    created_at  timestamptz not null default now()
);

create table if not exists follows (
    followee_user_id    bigint not null references users(id),
    follower_user_id    bigint not null references users(id),
    created_at          timestamptz not null default now(),
    primary key (followee_user_id, follower_user_id)
);

create table if not exists threads (
    id          bigserial primary key,
    user_id     bigint not null references users(id),
    slug        text unique not null,
    title       text not null,
    content     text not null,
    created_at  timestamptz not null default now()
);

create table if not exists comments (
    id          bigserial primary key,
    pid         bigint references comments(id) default null,
    thread_id   bigint not null references threads(id),
    user_id     bigint not null references users(id),
    content     text not null,
    created_at  timestamptz not null default now()
);

create table if not exists thread_votes (
    thread_id   bigint not null references threads(id),
    user_id     bigint not null references users(id),
    created_at  timestamptz not null default now(),
    primary key (thread_id, user_id)
);

create table if not exists comment_votes (
    comment_id  bigint not null references comments(id),
    user_id     bigint not null references users(id),
    created_at  timestamptz not null default now(),
    primary key (comment_id, user_id)
);
