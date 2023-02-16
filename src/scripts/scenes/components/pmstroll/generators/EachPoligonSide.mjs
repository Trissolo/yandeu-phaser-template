// pass in the array of points in a polygon
// returns the two vertices of each side of the rectangle
// returns: [sidePointA, sidePointB]

export default function* EachPoligonSide(ary)
{
    for (let i = 0, {length} = ary, j = length - 1; i < length; j = i++)
    {
        yield [ ary[i], ary[j] ];
    }
}
