create table users(
    id serial not null primary key,
    name varchar(32) not null,
    lastname varchar(32) not null,
    password varchar(128) not null ,
    phone1 varchar(12) not null,
    role int not null,
    phone2 varchar(12) not null,
    age int not null,
    direction_id int references direction(id) on delete cascade,
    group_id int,
    archive boolean default true  not null
);

insert into users(name,lastname,password,phone1,phone2,role,age) values(
  'superadmin',
  'adminov',
  'password',
  '998935467893',
  '998935467893',
  1,
  19
);

create table direction(
     id serial not null primary key,
     name varchar(64) not null
);
insert into direction(name) values(
  'SMM');
  'Ios',
  'Backend',
  'Cyber Security',
  'Grafik Dizayn',
  'Suniy intellekt',
  'Frontend',
  'SMM'
);

-- create table teachers(
--     id serial not null primary key,
--     name varchar(64) not null,
--     lastname varchar(64) not null,
--     role int not null,
--     phone varchar(12) not null,
--     direction int references direction(id) on delete cascade,
--     status boolean default true
-- );

create table groups(
    id serial not null primary key,
    name varchar(64),
    teacher_id int references users(id) on delete cascade,
    direction_id int not null  references  direction(id) on delete cascade,
    create_at date not null ,
    deleted_at date  ,
    active boolean default true not null
);

create table attendance(
      id serial not null,
      date date not null ,
      participate boolean default false ,
      group_id int not null references groups(id) on delete cascade,
      teacher_id int not null references users(id) on delete cascade,
      student_id int not null references users(id) on delete cascade,
      ball int default 0
);

create table tolov_tizimlari(
  id serial not null primary key,
  name varchar(32) not null
);

create table paid(
      id serial not null primary key,
      tolov_tizimi int  not null references tolov_tizimlari(id) on delete cascade,
      user_id int not null references users(id) on delete cascade,
      date date ,
      amount int ,
      debt int ,
      term date
);
create table courses(
   id serial primary key,
   date date,
   name varchar(64)
);
create table participent(
   id serial,
   phone varchar(12) not null,
   course_id int not null references courses(id) on delete cascade,
   name varchar(64) not null
);

create table chat(
   id serial not null primary key,
   just_user_id uuid not null references just_user(contact_id) on delete cascade,
   message varchar(2048) not null
);

CREATE TABLE just_user (
    id serial not null ,
    name varchar(64) default user,
    contact_id uuid DEFAULT uuid_generate_v4 () primary key
);

create table infos_from_clients(
  id serial not null,
  name varchar(64) not null,
  phone varchar(12) not null
)
