-- Create table
create table SYS_USER
(
  id          VARCHAR2(32) not null,
  login_id    VARCHAR2(32),
  login_pass  VARCHAR2(32),
  real_name   VARCHAR2(100),
  no          VARCHAR2(32),
  org_id      VARCHAR2(32),
  org_name    VARCHAR2(100),
  sex         CHAR(1),
  id_card     VARCHAR2(18),
  phone       VARCHAR2(20),
  mobile      VARCHAR2(20),
  email       VARCHAR2(100),
  last_time   TIMESTAMP(6),
  last_ip     VARCHAR2(50),
  login_num   NUMBER,
  is_disabled CHAR(1) default 0,
  is_del      CHAR(1) default 0,
  add_user    VARCHAR2(32),
  add_time    TIMESTAMP(6)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
-- Add comments to the table 
comment on table SYS_USER
  is '用户表';
-- Create/Recreate indexes 
create unique index USER_SFZH on SYS_USER (ID_CARD)
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
-- Create/Recreate primary, unique and foreign key constraints 
alter table SYS_USER
  add constraint USER_ID primary key (ID)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );