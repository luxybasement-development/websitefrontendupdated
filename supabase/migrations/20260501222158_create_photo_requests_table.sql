/*
  # Create photo_requests table

  Stores all photo requests submitted from product pages so they are never lost,
  regardless of email delivery status.

  1. New Tables
    - `photo_requests`
      - `id` (uuid, primary key)
      - `name` (text) — customer's name
      - `email` (text) — customer's email
      - `notes` (text) — optional specific areas requested
      - `product_title` (text) — name of the product
      - `product_url` (text) — full URL of the product page
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Allow anonymous inserts (public form, no auth required)
    - No select/update/delete policy for public — only service role can read
*/

CREATE TABLE IF NOT EXISTS photo_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  notes text DEFAULT '',
  product_title text NOT NULL,
  product_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE photo_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a photo request"
  ON photo_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
