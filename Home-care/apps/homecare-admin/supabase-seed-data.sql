
truncate table notifications, bookings, services, users restart identity cascade;

-- ============================================================
-- USERS
-- ============================================================
insert into users (id, name, email, phone, avatar, status, role, total_bookings, total_spent, joined_at, last_active) values
  ('USR001', 'Priya Sharma',     'priya.sharma@gmail.com',   '+91 98765 43210', 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',    'active',   'customer',  8,  12400, '2024-06-15T00:00:00Z', '2026-03-24T14:30:00Z'),
  ('USR002', 'Rahul Verma',      'rahul.verma@gmail.com',    '+91 87654 32109', 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahul',    'active',   'customer',  5,   8750, '2024-08-20T00:00:00Z', '2026-03-23T09:15:00Z'),
  ('USR003', 'Ananya Iyer',      'ananya.iyer@gmail.com',    '+91 76543 21098', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ananya',   'active',   'customer',  3,   5600, '2024-11-10T00:00:00Z', '2026-03-22T16:45:00Z'),
  ('USR004', 'Vikram Singh',     'vikram.singh@gmail.com',   '+91 65432 10987', 'https://api.dicebear.com/7.x/avataaars/svg?seed=vikram',   'inactive', 'customer',  2,   3200, '2025-01-05T00:00:00Z', '2025-12-15T11:20:00Z'),
  ('USR005', 'Sunita Patel',     'sunita.patel@gmail.com',   '+91 54321 09876', 'https://api.dicebear.com/7.x/avataaars/svg?seed=sunita',   'active',   'provider', 42,      0, '2024-03-01T00:00:00Z', '2026-03-24T18:00:00Z'),
  ('USR006', 'Deepak Mehta',     'deepak.mehta@gmail.com',   '+91 43210 98765', 'https://api.dicebear.com/7.x/avataaars/svg?seed=deepak',   'active',   'provider', 38,      0, '2024-04-12T00:00:00Z', '2026-03-24T17:00:00Z'),
  ('USR007', 'Kavya Nair',       'kavya.nair@gmail.com',     '+91 32109 87654', 'https://api.dicebear.com/7.x/avataaars/svg?seed=kavya',    'active',   'customer',  6,   9800, '2024-07-22T00:00:00Z', '2026-03-21T10:30:00Z'),
  ('USR008', 'Arjun Reddy',      'arjun.reddy@gmail.com',    '+91 21098 76543', 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun',    'active',   'customer',  4,   6100, '2024-09-30T00:00:00Z', '2026-03-20T14:00:00Z'),
  ('USR009', 'Meena Krishnan',   'meena.k@gmail.com',        '+91 90876 54321', 'https://api.dicebear.com/7.x/avataaars/svg?seed=meena',    'active',   'provider', 55,      0, '2024-02-14T00:00:00Z', '2026-03-25T08:00:00Z'),
  ('USR010', 'Admin User',        'admin@homecare.in',         '+91 11111 11111', 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',    'active',   'admin',     0,      0, '2024-01-01T00:00:00Z', '2026-03-25T12:00:00Z');

-- ============================================================
-- SERVICES
-- ============================================================
insert into services (id, name, description, category, price, duration, image, is_active, rating, bookings_count) values
  ('SRV001', 'Deep Home Cleaning',        'Thorough cleaning of your entire home including hard-to-reach areas, appliances, and detailed surface cleaning. Includes kitchen deep-clean.', 'cleaning',     1200, '4-6 hours',  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop', true,  4.8, 234),
  ('SRV002', 'Regular Cleaning',           'Standard cleaning covering all rooms, dusting, vacuuming, mopping, and bathroom sanitization. Perfect for weekly maintenance.', 'cleaning',      650, '2-3 hours',  'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=300&fit=crop', true,  4.6, 456),
  ('SRV003', 'Elderly Care – Daily',       'Compassionate daily care for seniors: medication reminders, meal preparation, exercise assistance, and companionship.', 'elderly-care', 1800, '8 hours',    'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&h=300&fit=crop', true,  4.9, 189),
  ('SRV004', 'Post-Surgery Nursing',       'Professional nursing care for post-operative patients including wound dressing, medication management, and recovery assistance.', 'nursing',      3000, '6-8 hours',  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop', true,  4.9,  98),
  ('SRV005', 'Garden & Lawn Maintenance', 'Complete garden care: lawn mowing, hedge trimming, weeding, seasonal planting, and composting.', 'gardening',   900, '3-4 hours',  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop', true,  4.5, 167),
  ('SRV006', 'Plumbing Repair',            'Expert plumbing services for leaks, blockages, tap installations, and emergency repairs.', 'home-repair',  1500, '1-4 hours',  'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop', false, 4.7, 145),
  ('SRV007', 'Physiotherapy at Home',      'Certified physiotherapist visits for mobility exercises, post-injury rehabilitation, and chronic pain management.', 'nursing',      2500, '1-2 hours',  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop', true,  4.8,  72),
  ('SRV008', 'Electrical Work',            'Wiring, switch/socket replacements, fan installations, inverter fitting, and safety inspections.', 'home-repair',  1200, '1-3 hours',  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop', true,  4.4, 110);

-- ============================================================
-- BOOKINGS (Distributed across the last 3 months so the charts look good!)
-- ============================================================
insert into bookings (id, customer_name, customer_email, service, service_category, date, time, status, payment_status, amount, address, notes, created_at) values
  ('BK001', 'Priya Sharma',   'priya.sharma@gmail.com',  'Deep Home Cleaning',       'cleaning',     '2026-03-28', '09:00 AM', 'confirmed',  'paid',    1200, '12, Shanti Nagar, Bandra West, Mumbai',       'Please bring eco-friendly products',          '2026-03-20T10:30:00Z'),
  ('BK002', 'Rahul Verma',    'rahul.verma@gmail.com',   'Elderly Care – Daily',     'elderly-care', '2026-03-29', '08:00 AM', 'pending',    'pending', 1800, '45, Rajpur Road, Dehradun',                   'Grandfather needs wheelchair assistance',       '2026-03-21T14:15:00Z'),
  ('BK003', 'Ananya Iyer',    'ananya.iyer@gmail.com',   'Post-Surgery Nursing',     'nursing',      '2026-03-26', '10:00 AM', 'completed',  'paid',    3000, '7, T Nagar, Chennai',                         'Patient recovering from knee surgery',         '2026-03-18T09:00:00Z'),
  ('BK004', 'Kavya Nair',     'kavya.nair@gmail.com',    'Regular Cleaning',         'cleaning',     '2026-03-30', '02:00 PM', 'confirmed',  'paid',     650, 'Flat 3B, Koramangala 5th Block, Bengaluru',   null,                                         '2026-03-22T11:45:00Z'),
  ('BK005', 'Arjun Reddy',    'arjun.reddy@gmail.com',   'Garden & Lawn Maintenance','gardening',    '2026-03-25', '11:00 AM', 'cancelled',  'refunded', 900, 'Plot 22, Jubilee Hills, Hyderabad',           'Cancelled due to rain forecast',              '2026-03-19T16:20:00Z'),
  ('BK006', 'Vikram Singh',   'vikram.singh@gmail.com',  'Plumbing Repair',          'home-repair',  '2026-03-31', '03:00 PM', 'pending',    'pending', 1500, '8, Sector 15, Chandigarh',                    'Bathroom tap leaking badly',                   '2026-03-23T08:30:00Z'),
  ('BK007', 'Priya Sharma',   'priya.sharma@gmail.com',  'Physiotherapy at Home',    'nursing',      '2026-04-01', '07:00 AM', 'confirmed',  'paid',    2500, '12, Shanti Nagar, Bandra West, Mumbai',       'Knee pain, need gentle exercises',            '2026-03-24T09:00:00Z'),
  ('BK008', 'Meena Krishnan', 'meena.k@gmail.com',       'Electrical Work',          'home-repair',  '2026-04-02', '10:00 AM', 'pending',    'pending', 1200, '55, Anna Nagar, Chennai',                     'Fan installation in 3 rooms',                 '2026-03-24T11:00:00Z'),
  
  -- Extra bookings from last month to make the charts show a growth line!
  ('BK009', 'Nitin Bose',     'nitin.bose@gmail.com',    'Regular Cleaning',         'cleaning',     '2026-02-15', '10:00 AM', 'completed',  'paid',     650, 'Salt Lake Sector V, Kolkata',                 null,                                         '2026-02-10T11:00:00Z'),
  ('BK010', 'Sunita Patel',   'sunita.patel@gmail.com',  'Deep Home Cleaning',       'cleaning',     '2026-02-28', '09:00 AM', 'completed',  'paid',    1200, 'Vasant Kunj, New Delhi',                      null,                                         '2026-02-24T09:00:00Z'),
  ('BK011', 'Arjun Reddy',    'arjun.reddy@gmail.com',   'Elderly Care – Daily',     'elderly-care', '2026-01-20', '08:00 AM', 'completed',  'paid',    1800, 'Plot 22, Jubilee Hills, Hyderabad',           null,                                         '2026-01-15T14:00:00Z');

-- ============================================================
-- NOTIFICATIONS
-- ============================================================
insert into notifications (id, type, title, message, read, created_at) values
  ('NOT001', 'booking',  'New Booking Request',   'Rahul Verma has requested Elderly Care – Daily on March 29. Please confirm.',              false, '2026-03-24T10:30:00Z'),
  ('NOT002', 'payment',  'Payment Received',       'Payment of ₹1,200 received from Priya Sharma for Deep Home Cleaning.',                     false, '2026-03-24T09:15:00Z'),
  ('NOT003', 'alert',    'Booking Cancelled',      'Arjun Reddy has cancelled the Garden & Lawn Maintenance booking for March 25.',            true,  '2026-03-23T16:45:00Z'),
  ('NOT004', 'info',     'Service Rating',         'Ananya Iyer rated Post-Surgery Nursing 5 stars — "Excellent care, very professional!"',    true,  '2026-03-22T14:20:00Z'),
  ('NOT005', 'booking',  'Booking Confirmed',      'Kavya Nair''s Regular Cleaning booking for March 30 at 2 PM has been confirmed.',          false, '2026-03-22T11:50:00Z'),
  ('NOT006', 'payment',  'Payment Pending',         'Booking BK002 for Rahul Verma is awaiting payment of ₹1,800.',                            false, '2026-03-21T08:00:00Z'),
  ('NOT007', 'info',     'New Provider Registered','Deepak Mehta has joined as a service provider. Review his profile and assign bookings.',   true,  '2026-03-20T07:00:00Z');
