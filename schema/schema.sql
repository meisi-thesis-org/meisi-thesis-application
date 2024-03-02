CREATE TABLE users (
    uuid VARCHAR (255) UNIQUE NOT NULL,
    username VARCHAR (255) UNIQUE NOT NULL, 
    email VARCHAR (255) UNIQUE NOT NULL, 
    access_code VARCHAR (255) UNIQUE NOT NULL, 
    phone_number VARCHAR (255) UNIQUE NOT NULL, 
    name VARCHAR (255) NOT NULL, 
    date_birth VARCHAR (255) NOT NULL, 
    created_at VARCHAR (255) NOT NULL, 
    updated_at VARCHAR (255) NOT NULL,
    PRIMARY KEY(uuid)
)

CREATE TABLE devices (
    uuid VARCHAR (255) UNIQUE NOT NULL,
    user_uuid VARCHAR (255) UNIQUE NOT NULL, 
    user_agent VARCHAR (255) UNIQUE NOT NULL, 
    visible BOOLEAN NOT NULL, 
    active BOOLEAN NOT NULL, 
    created_at VARCHAR (255) NOT NULL, 
    updated_at VARCHAR (255) NOT NULL,
    PRIMARY KEY(uuid)
)

CREATE TABLE networks (
    uuid VARCHAR (255) UNIQUE NOT NULL,
    user_uuid VARCHAR (255) UNIQUE NOT NULL, 
    latitude INT UNIQUE NOT NULL, 
    longitude INT UNIQUE NOT NULL, 
    visible BOOLEAN NOT NULL, 
    active BOOLEAN NOT NULL, 
    created_at VARCHAR (255) NOT NULL, 
    updated_at VARCHAR (255) NOT NULL,
    PRIMARY KEY(uuid)
)

CREATE TABLE dossiers (
    uuid VARCHAR (255) UNIQUE NOT NULL,
    user_uuid VARCHAR (255) UNIQUE NOT NULL, 
    price INT UNIQUE NOT NULL, 
    designation VARCHAR (255) UNIQUE NOT NULL, 
    visible BOOLEAN NOT NULL, 
    active BOOLEAN NOT NULL, 
    created_at VARCHAR (255) NOT NULL, 
    updated_at VARCHAR (255) NOT NULL,
    PRIMARY KEY(uuid)
)

CREATE TABLE books (
    uuid VARCHAR (255) UNIQUE NOT NULL,
    dossier_uuid VARCHAR (255) UNIQUE NOT NULL, 
    designation VARCHAR (255) UNIQUE NOT NULL, 
    description VARCHAR (255) UNIQUE NOT NULL, 
    price INT UNIQUE NOT NULL, 
    visible BOOLEAN NOT NULL, 
    active BOOLEAN NOT NULL, 
    created_at VARCHAR (255) NOT NULL, 
    updated_at VARCHAR (255) NOT NULL,
    PRIMARY KEY(uuid)
)

CREATE TABLE chapters (
    uuid VARCHAR (255) UNIQUE NOT NULL,
    book_uuid VARCHAR (255) UNIQUE NOT NULL, 
    designation VARCHAR (255) UNIQUE NOT NULL, 
    description VARCHAR (255) UNIQUE NOT NULL, 
    price INT UNIQUE NOT NULL, 
    visible BOOLEAN NOT NULL, 
    active BOOLEAN NOT NULL, 
    created_at VARCHAR (255) NOT NULL, 
    updated_at VARCHAR (255) NOT NULL,
    PRIMARY KEY(uuid)
)

CREATE TABLE pages (
    uuid VARCHAR (255) UNIQUE NOT NULL,
    chapter_uuid VARCHAR (255) UNIQUE NOT NULL, 
    designation VARCHAR (255) UNIQUE NOT NULL, 
    description VARCHAR (255) UNIQUE NOT NULL, 
    price INT UNIQUE NOT NULL, 
    visible BOOLEAN NOT NULL, 
    active BOOLEAN NOT NULL, 
    created_at VARCHAR (255) NOT NULL, 
    updated_at VARCHAR (255) NOT NULL,
    PRIMARY KEY(uuid)
)

CREATE TABLE walllets {
    uuid VARCHAR (255) UNIQUE NOT NULL,
    user_uuid VARCHAR (255) UNIQUE NOT NULL, 
    funds INT UNIQUE NOT NULL, 
    visible BOOLEAN NOT NULL, 
    active BOOLEAN NOT NULL, 
    created_at VARCHAR (255) NOT NULL, 
    updated_at VARCHAR (255) NOT NULL,
    PRIMARY KEY(uuid)
}

CREATE TABLE subscriptions {
    uuid VARCHAR (255) UNIQUE NOT NULL,
    wallet_uuid VARCHAR (255) UNIQUE NOT NULL, 
    dossier_uuid VARCHAR (255) UNIQUE NOT NULL, 
    book_uuid VARCHAR (255) UNIQUE NOT NULL, 
    chapter_uuid VARCHAR (255) UNIQUE NOT NULL, 
    page_uuid VARCHAR (255) UNIQUE NOT NULL, 
    visible BOOLEAN NOT NULL,
    active BOOLEAN NOT NULL, 
    created_at VARCHAR (255) NOT NULL, 
    updated_at VARCHAR (255) NOT NULL,
    PRIMARY KEY(uuid)
}