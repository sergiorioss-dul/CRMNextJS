import Layout from "@/components/Layout"
import { BEST_CUSTOMERS } from "@/graphql/querys";
import { ICustomerGraphics } from "@/models";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

const BestCustomers = () => {

    const { data, loading, error, startPolling, stopPolling } = useQuery(BEST_CUSTOMERS)

    useEffect(() => {
        startPolling(20000)
        return () => {
            stopPolling()
        }
    }, [startPolling, stopPolling])

    if (loading) return 'Loading'
    const { getBestCustomers } = data
    const customerGraphics: ICustomerGraphics[] = [];

    getBestCustomers.map((customer: ICustomerGraphics, index: number) => {
        if (!customer.customer) return
        customerGraphics[index] = {
            ...customer.customer[0],
            total: customer.total
        }
    })

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Best Customers</h1>
            <BarChart
                className="mt-10"
                width={600}
                height={500}
                data={customerGraphics}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#3182CE" />
            </BarChart>
        </Layout>
    )
}

export default BestCustomers
