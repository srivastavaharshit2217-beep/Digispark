CREATE TABLE IF NOT EXISTS enquiries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  service VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(30) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO services (name, description, price)
SELECT * FROM (
  VALUES
    ('Web Development', 'Modern and responsive websites for businesses.', 'Contact Us'),
    ('Digital Marketing', 'Social media marketing and online advertising.', 'Contact Us'),
    ('SEO', 'Search engine optimization for better visibility.', 'Contact Us'),
    ('Graphic Design', 'Professional branding and social media designs.', 'Contact Us'),
    ('Video Editing', 'Reels, advertisements and professional video editing.', 'Contact Us'),
    ('Business Solutions', 'Digital solutions for modern businesses.', 'Contact Us')
) AS default_services(name, description, price)
WHERE NOT EXISTS (SELECT 1 FROM services);
