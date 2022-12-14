# quest-let-it-sink

## Quest Details
#### title: Let it sink
#### level: intermediate
#### skills: Backend, Database, Frontend
#### dependencies: docker-localsetup

## Overview

The user implements a new feature for showing verified users on the anythink website. This change includes adding a new
field to the DB model and api, and making a change on the UI.

## Outline

- Step 1 - "let_it_sink_is_verified_backend"
- Step 2 - "let_it_sink_is_verified_frontend"
- Step 3 - "let_it_sink_culture_document"

## Textbook solution

### Instructions for completing the quest:

#### Step 1 - "let_it_sink_is_verified_backend":

- Learning Objective:
    - Adding a new field to the DB model
    - Adding a new property to the API
- Narrative:
- Instructions:
    - Opening a PR with those changes:
        - The user should add the `isVerified` field to the DB model (`is_verified` for python)
        - For python and ruby the user should also create a migration script that will add the new column to database
          - Rails:
            - Create a new migration run from inside the docker `bin/rails generate migration add_isVerified_to_users isVerified:boolean`
            - Edit the newly create migration to add `default: false`
            - Pr for example: https://github.com/ObelusFamily/Anythink-Market-a2sp4/pull/27
          - Python:
            - The user should use `alembic` to run the migration: `poetry run alembic revision --message “adding is_verified field"`
            - Edit the migration code: with
              ```
              def upgrade() -> None:
                 op.execute('ALTER TABLE users ADD COLUMN is_verified BOOLEAN DEFAULT FALSE')
            -  and run `poetry run alembic upgrade head`

        - The user should add the `isVerified` field to the API endpoint
- How do users pass to the next step:
    - A test runs against their PR to verify that:
      - Hitting the /items api should return `isVerified: true` for a verified seller 
      - Hitting the /items api should return `isVerified: false` for a non verified seller
- Hints: (see yaml)

#### Step 2 - "let_it_sink_is_verified_frontend":

- Learning Objective:
    - Adding a new field to the Frontend
    - Implementing a design for a new feature
- Narrative:
- Instructions:
    - The user should open a PR with a change to the frontend which displays for verified seller an image on the feed
      items and the phrase: "TOP SELLER".
    - The element that should be added on the footer:
      ```js<span style={{ color: "white" }}>
              {item.seller.isVerified ?
                <span style={{ paddingLeft: "8px" }}>
                  <img width="30px" src="verified_seller.svg"/> TOP SELLER
                </span> : null}
            </span>
- How do users pass to the next step:
    - A test runs against their PR to verify that:
        - An image and a text is displayed for a verified seller's item on the feed.
        - An image and a text is **not** displayed for a non verified seller's item.
- Hints:

#### Step 3 - "let_it_sink_culture_document":

- Learning Objective:
- Narrative:
- Instructions:
- How do users pass to the next step:
    - The user clicks on a link to sign a cultural document (no new learning here). by agreeing the user finishes the
      quest.
- Hints:
