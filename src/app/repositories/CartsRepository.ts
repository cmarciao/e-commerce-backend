import { db } from "../../database";
import { Cart } from "../models/Cart";

type ICreateCart = Partial<Cart>;

class CartsRepository {
    async create({ user_id, amount, total }: ICreateCart): Promise<Cart> {
        const { rows } = await db.query(`
            INSERT INTO carts(user_id, amount, total)
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [user_id, amount, total]);
        const [response] = rows;

        return response;
    }

    async findByUserId(user_id: string): Promise<Cart> {
        const { rows } = await db.query(`
            SELECT *
            FROM carts
            WHERE user_id = $1;
        `, [user_id]);
        const [response] = rows;

        return response;
    }

    async update(id: string, amount: number, total: number, updated_at: Date) {
        await db.query(`
            UPDATE carts
            SET
                amount = $1,
                total = $2,
                updated_at = $3
            WHERE id = $4;
        `, [amount, total, updated_at, id]);
    }

    async delete(id: string) {
        await db.query(`
            DELETE FROM carts
            WHERE id=$1
        `, [id]);
    }
}
export default new CartsRepository();