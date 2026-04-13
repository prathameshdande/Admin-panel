-- Drop existing tables to ensure a clean slate
DROP TABLE IF EXISTS assignments CASCADE;
DROP TABLE IF EXISTS tenants CASCADE;
DROP TABLE IF EXISTS beds CASCADE;
DROP TABLE IF EXISTS rooms CASCADE;
DROP TABLE IF EXISTS flats CASCADE;
-- 1. Flats
CREATE TABLE flats (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- 2. Rooms
CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,
    flat_id INT REFERENCES flats(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    capacity INT NOT NULL CHECK (capacity > 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- 3. Beds
CREATE TABLE beds (
    id SERIAL PRIMARY KEY,
    room_id INT REFERENCES rooms(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'Available' CHECK (
        status IN ('Available', 'Occupied', 'Under Maintenance')
    ),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- 4. Tenants
CREATE TABLE tenants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- 5. Assignments (Tracks active/past bed assignments)
CREATE TABLE assignments (
    id SERIAL PRIMARY KEY,
    tenant_id INT REFERENCES tenants(id) ON DELETE CASCADE,
    bed_id INT REFERENCES beds(id) ON DELETE CASCADE,
    active BOOLEAN DEFAULT true,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Index for performance optimization on active queries
CREATE INDEX idx_active_assignments ON assignments(tenant_id, bed_id)
WHERE active = true;