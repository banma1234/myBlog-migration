import { NextResponse } from "next/server";
import { connectToDatabase } from "util/mongodb";

export default async function viewSeries() {
  try {
    let { db } = await connectToDatabase();

    let result: any = [];
    await db
      .collection("posts")
      .aggregate([
        {
          $group: {
            _id: "$series",
            unique_id: { $addToSet: "$series" },
            count: { $sum: 1 },
          },
        },
        {
          $match: {
            count: { $gte: 1 },
          },
        },
      ])
      .sort({ _id: -1 })
      .toArray()
      .then((docs: any) => {
        docs.forEach((item: any) => {
          result.push({
            series: item["_id"],
            count: item["count"],
          });
        });
      });

    let thumbnail = null;
    const options = { projection: { _id: 0, imageTitle: 1 } };
    for (let i = 0; i < result.length; i++) {
      try {
        thumbnail = await db
          .collection("thumbnail")
          .findOne({ series: result[i].series }, options);
        result[
          i
        ].thumbnail = `${process.env.NAVER_CDN_URL}/thumbnail/${thumbnail.imageTitle}`;
      } catch (e: unknown) {
        result[i].thumbnail = undefined;
        console.log(result[i].series, "thumbnail's undefined");
      }
    }

    // return the posts
    return NextResponse.json({
      data: result,
      success: true,
    });
  } catch (e: unknown) {
    // return the error
    return NextResponse.json({
      data: e,
      success: false,
    });
  }
}
