import { MikroORM } from "@mikro-orm/core"
import mikroConfig from "./mikro-orm.config"

async function main() {
    const orm = await MikroORM.init(mikroConfig);
    console.log(orm);
};

main().catch(error => console.error(error));