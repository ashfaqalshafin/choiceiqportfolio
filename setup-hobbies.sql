-- Create hobbies table
CREATE TABLE IF NOT EXISTS hobbies (
  id SERIAL PRIMARY KEY,
  profile_id INTEGER,
  name TEXT NOT NULL,
  icon TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Insert some sample hobbies for the default profile
INSERT INTO hobbies (profile_id, name, icon, description)
VALUES 
  (1, 'Photography', 'camera', 'Capturing beautiful moments and landscapes'),
  (1, 'Reading', 'book-open', 'Exploring new worlds through books'),
  (1, 'Hiking', 'mountain', 'Exploring nature and staying active'),
  (1, 'Coding', 'code', 'Building cool projects and learning new technologies');
