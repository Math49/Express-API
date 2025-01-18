import { Coupures } from "@dab_hock/dab";

export function processData(input) {

    let result = Coupures({
        amount: input.inputPrice,
        devise: input.inputCountry,
    })


    return {
        result: result,
    };
}
