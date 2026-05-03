import { connectDB } from "@/lib/db";
import CustomOrder from "@/models/CustomOrder";

export async function POST(req){

await connectDB();

const body = await req.json();

/*
SAVE ORDER
*/

const order = await CustomOrder.create(body);


/*
WHATSAPP ADMIN ALERT (SILENT)
*/

const msg = `New Custom Order 🚀

Name: ${body.name}
Phone: ${body.phone}
Hostel: ${body.hostel}
Room: ${body.room}

Item:
${body.item}

Note:
${body.note || "None"}
`;

/*
Meta WhatsApp Cloud API required here later
Currently logging fallback
*/

console.log(msg);


/*
RETURN SUCCESS RESPONSE
*/

return Response.json({
success:true,
type:"custom"
});

}