CREATE DATABASE IF NOT EXISTS digispark;
USE digispark;

CREATE TABLE IF NOT EXISTS enquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  service VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(30) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO services (name, description, price)
SELECT * FROM (
  SELECT 'Web Development', 'Modern and responsive websites for businesses.', 'Contact Us'
  UNION ALL SELECT 'Digital Marketing', 'Social media marketing and online advertising.', 'Contact Us'
  UNION ALL SELECT 'SEO', 'Search engine optimization for better visibility.', 'Contact Us'
  UNION ALL SELECT 'Graphic Design', 'Professional branding and social media designs.', 'Contact Us'
  UNION ALL SELECT 'Video Editing', 'Reels, advertisements and professional video editing.', 'Contact Us'
  UNION ALL SELECT 'Business Solutions', 'Digital solutions for modern businesses.', 'Contact Us'
) AS default_services
WHERE NOT EXISTS (SELECT 1 FROM services);
