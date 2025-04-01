import { prisma } from "@/lib/prisma";
import { currentUser} from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest){

    try {
      const clerkUser = await currentUser();

      if(!clerkUser) {
        return NextResponse.json({error: "User Not found"}, {status: 404});
      }  

      //check for user already exist
      const existingProfile = await prisma.profile.findUnique({
        where:{userId:clerkUser.id},
      });

      if(existingProfile){
        //profile alreday exist
        return NextResponse.json({message:' user already exist'})
      }

      //Otherwise, create the profile
      await prisma.profile.create({
        data:{
            userId:clerkUser.id,
            email: clerkUser.emailAddresses[0].emailAddress,
            subscriptionActive:false,
            subscriptionTier:null,
            stripeSubscriptionId:null
        },
      });
      console.log(`Prisma profile created for user: ${clerkUser.id}`);
      return NextResponse.json({
        message: 'Profile created successfully',
      },{status:201});   
       
    } catch (error) {
     console.error('error in create-profile API:', error);
     return NextResponse.json({error:'Internal server error'},{status:500});
    }
}