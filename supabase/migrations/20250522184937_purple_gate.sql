/*
  # Initial Schema Setup for Mamou Tourism

  1. New Tables
    - blogs
      - id (uuid, primary key)
      - title (text)
      - content (jsonb)
      - published_date (timestamptz)
      - image_url (text)
      - created_at (timestamptz)
      
    - events
      - id (uuid, primary key)
      - title (text)
      - content (jsonb)
      - event_date (timestamptz)
      - location (text)
      - price (text)
      - image_url (text)
      - created_at (timestamptz)
      
    - matches
      - id (uuid, primary key)
      - status (text)
      - home_team (text)
      - away_team (text)
      - home_score (text)
      - away_score (text)
      - location (text)
      - match_date (text)
      - match_time (text)
      - created_at (timestamptz)
      
    - schools
      - id (uuid, primary key)
      - title (text)
      - description (jsonb)
      - image_url (text)
      - created_at (timestamptz)
      
    - sport_news
      - id (uuid, primary key)
      - title (text)
      - content (jsonb)
      - date (timestamptz)
      - image_url (text)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content jsonb,
  published_date timestamptz,
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read blogs"
  ON blogs
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create blogs"
  ON blogs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content jsonb,
  event_date timestamptz,
  location text,
  price text,
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read events"
  ON events
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create events"
  ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create matches table
CREATE TABLE IF NOT EXISTS matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  status text,
  home_team text,
  away_team text,
  home_score text,
  away_score text,
  location text,
  match_date text,
  match_time text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read matches"
  ON matches
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create matches"
  ON matches
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create schools table
CREATE TABLE IF NOT EXISTS schools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description jsonb,
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE schools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read schools"
  ON schools
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create schools"
  ON schools
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create sport_news table
CREATE TABLE IF NOT EXISTS sport_news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content jsonb,
  date timestamptz,
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE sport_news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read sport news"
  ON sport_news
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create sport news"
  ON sport_news
  FOR INSERT
  TO authenticated
  WITH CHECK (true);