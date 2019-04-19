-- The SQL should use a parameter to find the product whose product_id matches.
UPDATE product
SET description = $2
WHERE
 product_id = $1 --parameter