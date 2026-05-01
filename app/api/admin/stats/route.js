import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET() {

await connectDB();


/*
TODAY RANGE (12AM → 12AM)
*/

const start = new Date();
start.setHours(0,0,0,0);

const end = new Date();
end.setHours(23,59,59,999);


/*
STATUS COUNTS
*/

const newOrders =
await Order.countDocuments({
orderStatus:"placed"
});

const processingOrders =
await Order.countDocuments({
orderStatus:{
$in:["confirmed","out_for_delivery"]
}
});

const completedOrders =
await Order.countDocuments({
orderStatus:"delivered"
});


/*
TODAY ORDERS
*/

const todayOrders =
await Order.find({
createdAt:{
$gte:start,
$lte:end
}
});


/*
ALL ORDERS
*/

const allOrders =
await Order.find();


/*
CALCULATIONS
*/

const todayRevenue =
todayOrders.reduce(
(acc,o)=>acc+o.totalAmount,
0
);

const todayProfit =
todayOrders.reduce(
(acc,o)=>acc+o.netProfit,
0
);

const totalRevenue =
allOrders.reduce(
(acc,o)=>acc+o.totalAmount,
0
);

const totalProfit =
allOrders.reduce(
(acc,o)=>acc+o.netProfit,
0
);


return Response.json({

newOrders,
processingOrders,
completedOrders,

todayOrders:todayOrders.length,
todayRevenue,
todayProfit,

totalOrders:allOrders.length,
totalRevenue,
totalProfit

});

}