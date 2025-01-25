import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDb1737791675262 implements MigrationInterface {
  name = 'InitDb1737791675262';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."achievements_type_enum" AS ENUM('CERTIFICATION', 'SCHOLARSHIP', 'AWARD', 'BADGE', 'OTHER')`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        'portfolio-db',
        'public',
        'achievements',
        'GENERATED_COLUMN',
        'search_vector',
        "to_tsvector('simple', title || ' ' || COALESCE(provider, ''))",
      ],
    );
    await queryRunner.query(
      `CREATE TABLE "achievements" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "portfolio_id" uuid NOT NULL, "title" character varying(255) NOT NULL, "provider" character varying(255), "started_at" TIMESTAMP, "ended_at" TIMESTAMP, "description" character varying(255), "thumbnail" character varying(255), "url" character varying(255), "type" "public"."achievements_type_enum" NOT NULL DEFAULT 'OTHER', "is_public" boolean NOT NULL DEFAULT false, "search_vector" tsvector GENERATED ALWAYS AS (to_tsvector('simple', title || ' ' || COALESCE(provider, ''))) STORED, "portfolioId" uuid, CONSTRAINT "PK_1bc19c37c6249f70186f318d71d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid NOT NULL, "email" character varying(255) NOT NULL, "github" character varying(255), "linkedin" character varying(255), "twitter" character varying(255), "facebook" character varying(255), "youtube" character varying(255), "telegram" character varying(255), "discord" character varying(255), "twitch" character varying(255), "snapchat" character varying(255), "whatsapp" character varying(255), CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        'portfolio-db',
        'public',
        'skills',
        'GENERATED_COLUMN',
        'search_vector',
        "to_tsvector('simple', name)",
      ],
    );
    await queryRunner.query(
      `CREATE TABLE "skills" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(255) NOT NULL, "search_vector" tsvector GENERATED ALWAYS AS (to_tsvector('simple', name)) STORED, CONSTRAINT "UQ_81f05095507fd84aa2769b4a522" UNIQUE ("name"), CONSTRAINT "PK_0d3212120f4ecedf90864d7e298" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "project_skills" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "project_id" uuid NOT NULL, "skill_id" uuid NOT NULL, CONSTRAINT "PK_76a7f6ff4b84e9a580e24d09cc6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_skills" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "portfolio_id" uuid NOT NULL, "skill_id" uuid NOT NULL, "description" text, CONSTRAINT "PK_4d0a72117fbf387752dbc8506af" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('ADMIN', 'USER')`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        'portfolio-db',
        'public',
        'users',
        'GENERATED_COLUMN',
        'search_vector',
        "to_tsvector('simple', name || ' ' || email || ' ' || COALESCE(phone_number, ''))",
      ],
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying NOT NULL, "phone_code" character varying, "phone_number" character varying, "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER', "search_vector" tsvector GENERATED ALWAYS AS (to_tsvector('simple', name || ' ' || email || ' ' || COALESCE(phone_number, ''))) STORED, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        'portfolio-db',
        'public',
        'portfolios',
        'GENERATED_COLUMN',
        'search_vector',
        "to_tsvector('simple', title)",
      ],
    );
    await queryRunner.query(
      `CREATE TABLE "portfolios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid NOT NULL, "title" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "avatar" character varying(255) NOT NULL, "is_public" boolean NOT NULL DEFAULT false, "search_vector" tsvector GENERATED ALWAYS AS (to_tsvector('simple', title)) STORED, CONSTRAINT "PK_488aa6e9b219d1d9087126871ae" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        'portfolio-db',
        'public',
        'projects',
        'GENERATED_COLUMN',
        'search_vector',
        "to_tsvector('simple', name || ' ' || COALESCE(organization, ''))",
      ],
    );
    await queryRunner.query(
      `CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "portfolio_id" uuid NOT NULL, "name" character varying(255) NOT NULL, "organization" character varying(255), "started_at" TIMESTAMP, "ended_at" TIMESTAMP, "description" character varying(255), "thumbnail" character varying(255), "url" character varying(255), "source_code_url" character varying(255), "is_public" boolean NOT NULL DEFAULT false, "search_vector" tsvector GENERATED ALWAYS AS (to_tsvector('simple', name || ' ' || COALESCE(organization, ''))) STORED, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "achievements" ADD CONSTRAINT "FK_8d38560a28ab963a02444f29635" FOREIGN KEY ("portfolioId") REFERENCES "portfolios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_skills" ADD CONSTRAINT "FK_d28a809ea4c3e5d71a5679a33b4" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_skills" ADD CONSTRAINT "FK_903cd0ac4cc4681039d306c485e" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_skills" ADD CONSTRAINT "FK_770bc6fe9cb50af7934945a575a" FOREIGN KEY ("portfolio_id") REFERENCES "portfolios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_skills" ADD CONSTRAINT "FK_eb69710b0a00f42fb95fc2ac2f5" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ADD CONSTRAINT "FK_c2a7c763195dbbcd4e22c062669" FOREIGN KEY ("portfolio_id") REFERENCES "portfolios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "projects" DROP CONSTRAINT "FK_c2a7c763195dbbcd4e22c062669"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_skills" DROP CONSTRAINT "FK_eb69710b0a00f42fb95fc2ac2f5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_skills" DROP CONSTRAINT "FK_770bc6fe9cb50af7934945a575a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_skills" DROP CONSTRAINT "FK_903cd0ac4cc4681039d306c485e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_skills" DROP CONSTRAINT "FK_d28a809ea4c3e5d71a5679a33b4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "achievements" DROP CONSTRAINT "FK_8d38560a28ab963a02444f29635"`,
    );
    await queryRunner.query(`DROP TABLE "projects"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "database" = $3 AND "schema" = $4 AND "table" = $5`,
      [
        'GENERATED_COLUMN',
        'search_vector',
        'portfolio-db',
        'public',
        'projects',
      ],
    );
    await queryRunner.query(`DROP TABLE "portfolios"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "database" = $3 AND "schema" = $4 AND "table" = $5`,
      [
        'GENERATED_COLUMN',
        'search_vector',
        'portfolio-db',
        'public',
        'portfolios',
      ],
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "database" = $3 AND "schema" = $4 AND "table" = $5`,
      ['GENERATED_COLUMN', 'search_vector', 'portfolio-db', 'public', 'users'],
    );
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TABLE "user_skills"`);
    await queryRunner.query(`DROP TABLE "project_skills"`);
    await queryRunner.query(`DROP TABLE "skills"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "database" = $3 AND "schema" = $4 AND "table" = $5`,
      ['GENERATED_COLUMN', 'search_vector', 'portfolio-db', 'public', 'skills'],
    );
    await queryRunner.query(`DROP TABLE "contacts"`);
    await queryRunner.query(`DROP TABLE "achievements"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "database" = $3 AND "schema" = $4 AND "table" = $5`,
      [
        'GENERATED_COLUMN',
        'search_vector',
        'portfolio-db',
        'public',
        'achievements',
      ],
    );
    await queryRunner.query(`DROP TYPE "public"."achievements_type_enum"`);
  }
}
