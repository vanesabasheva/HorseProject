CREATE TABLE IF NOT EXISTS owner
(
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name  VARCHAR(255) NOT NULL,
    email      VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS horse
(
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(255)            NOT NULL,
    description   VARCHAR(4095),
    date_of_birth DATE                    NOT NULL,
    sex           ENUM ('MALE', 'FEMALE') NOT NULL,
    owner_id      BIGINT                  NULL,
    mother_id     BIGINT                  NULL,
    father_id     BIGINT                  NULL,

    FOREIGN KEY (owner_id) REFERENCES owner (id) ON DELETE SET null,
    FOREIGN KEY (mother_id) REFERENCES horse (id) ON DELETE SET null,
    FOREIGN KEY (father_id) REFERENCES horse (id) ON DELETE SET null
);