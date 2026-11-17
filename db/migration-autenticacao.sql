-- Execute no banco já existente do Render para habilitar cadastro e login com JWT.
-- Usuários antigos permanecem sem senha até que uma senha seja definida para eles.
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS senha_hash VARCHAR(255);
