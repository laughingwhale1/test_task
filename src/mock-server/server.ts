import { Server } from "miragejs";
export function makeServer() {
    let server = new Server();
    server.get(
        "/api/test-data",
        () => {
            return(
            [
                {
                    TransactionId: 1,
                    Status: 'Completed',
                    Type: "Withdraw",
                    ClientName: 'Lee Samsung',
					Amount: 12
				},
				{
                    TransactionId: 2,
                    Status: 'Pending',
                    Type: "Refill",
                    ClientName: 'Viktor Xiaomi',
					Amount: 116
                },
                {
                    TransactionId: 3,
                    Status: 'Canceled',
                    Type: "Withdraw",
                    ClientName: 'Adam Iphone',
					Amount: 1166
                },
                {
                    TransactionId: 4,
                    Status: 'Completed',
                    Type: "Withdraw",
                    ClientName: 'Marta Siemens',
					Amount: 11235
                },
            ])
        },
        { timing: 1000 }
    );
}
