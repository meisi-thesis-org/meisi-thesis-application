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
    PRIMARY KEY(uuid),
    CONSTRAINT fk_user
      FOREIGN KEY(user_uuid) 
        REFERENCES user(uuid)
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
    PRIMARY KEY(uuid),
    CONSTRAINT fk_user
      FOREIGN KEY(user_uuid) 
        REFERENCES user(uuid)
)