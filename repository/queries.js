export const LOGIN = {
  text: "SELECT * FROM vss.company WHERE company_name=$1 AND company_password=$2 ;",
};

export const ADD_PRODUCT = {
  text: "INSERT INTO vss.product( company_id, product_type, product_name, product_salary) VALUES ( $1, $2, $3, $4);",
};

export const GET_PRODUCT = {
  text: "SELECT * FROM vss.product WHERE id=$1",
};

export const GET_PRODUCT_TYPE = {
  text: "SELECT * FROM vss.product_type WHERE id=$1",
};

export const GET_COMPANY = {
  text: "SELECT * FROM vss.company WHERE id=$1",
};

export const GET_ALL_PRODUCT = {
  text:
    "SELECT product.id as product_id,product_type_name,product.product_name,product.product_salary " +
    "FROM vss.product as product " +
    "INNER JOIN vss.product_type as product_type ON product_type.id = product.product_type " +
    "WHERE product.company_id=$1 order by product_type_name, product_id",
};

export const UPDATE_PRODUCT = {
  text: "UPDATE vss.product SET product_name=$2,product_salary=$3,product_type=$4 WHERE id=$1 ",
};

export const DELETE_PRODUCT = {
  text: "DELETE FROM vss.product WHERE id=$1 ",
};
