--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5
-- Dumped by pg_dump version 11.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permissions (
    id integer NOT NULL,
    name character varying(20) NOT NULL,
    created_at timestamp without time zone NOT NULL
);


ALTER TABLE public.permissions OWNER TO postgres;

--
-- Name: permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.permissions_id_seq OWNER TO postgres;

--
-- Name: permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.permissions_id_seq OWNED BY public.permissions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(20) NOT NULL,
    hashed_password character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    profile_picture_path character varying(255),
    created_at timestamp without time zone NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions ALTER COLUMN id SET DEFAULT nextval('public.permissions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.permissions (id, name, created_at) FROM stdin;
1	admin	2019-12-03 09:27:29.217
2	user	2019-12-03 09:27:29.217
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, hashed_password, email, profile_picture_path, created_at, permission_id) FROM stdin;
22	quest1onmark	$argon2i$v=19$m=4096,t=3,p=1$4CQTLRTz3oiJGuMny4NxwA$b4TASz+x3SU5um9ysc1Salh0kpJ8fvNfeicDMkS+Vq0	jonas.schultheiss3@gmail.com	https://filelify.fra1.digitaloceanspaces.com/_profilePictures/_default.png	2020-01-05 02:04:28.024	2
24	acvcas	$argon2i$v=19$m=4096,t=3,p=1$d7SnQG1w6RIdwUy1B/NgYA$BlH0T5wtXfCDE+jbq2M1fNWbPvDE5vcNab6byvfdY3A	test@test.com	https://filelify.fra1.digitaloceanspaces.com/_profilePictures/_default.png	2020-01-06 03:24:02.77	2
28	acvascas	$argon2i$v=19$m=4096,t=3,p=1$Rtpls6e9AUpCNRRbo3SKlA$3jIpHRC/l91qGiQf3yvdL0hifi7hyr9TvhbzA1Of2nE	test@tsest.com	https://filelify.fra1.digitaloceanspaces.com/_profilePictures/_default.png	2020-01-06 04:01:39.775	2
29	yxcvb	$argon2i$v=19$m=4096,t=3,p=1$xW3NYflQep8gogu7N50Fhg$T/dcxjAqaLuf3dJ00EXpqoi6iLCAGl3fDR6D9EAh89Y	e@m.com	https://filelify.fra1.digitaloceanspaces.com/_profilePictures/_default.png	2020-01-06 21:11:29.632	1
30	bvcxy	$argon2i$v=19$m=4096,t=3,p=1$5Nuzuk4SLUdgtnOjj5EmmA$ui3rLd4mEDTb9BoZHg1rMfChz6bqoVIBfRuHiXLv4RQ	jonas.schultheiss@gmail.com	https://filelifygg.fra1.digitaloceanspaces.com/_profilePictures/30	2020-01-07 00:39:39.294	2
\.


--
-- Name: permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.permissions_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 30, true);


--
-- Name: permissions permissions_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_name_key UNIQUE (name);


--
-- Name: permissions permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: users users_permission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES public.permissions(id) DEFERRABLE;


--
-- PostgreSQL database dump complete
--

