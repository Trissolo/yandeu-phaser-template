// example: ary = ['A', 'B', 'C', 'D', 'E'];
// result:
// EAB,
// ABC,
// BCD,
// CDE,
// DEA
// returns: [curr, succ, prec]

export default function* EachVectorAndAdjacents(ary)
{
    const len = ary.length - 1;
    let i = 0, j = len;

    for( ; i < len; j = i++)
    {
    // yield { curr: ary[i], succ: ary[i + 1], prec: ary[j] };
        yield [ ary[i], ary[i + 1], ary[j] ];

    }

    // yield { curr: ary[i], succ: ary[0], prec: ary[j] };
    yield [ ary[i], ary[0], ary[j] ];

};
