import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    const id: string = req.page.params?.id.toString() || '';

    const checkMongoIDRegExp = new RegExp('^[0-9a-fA-F]{24}$');

    if (!checkMongoIDRegExp.test(id)) {
        console.log('respuesta');

        return new Response(
            JSON.stringify({ message: 'el id no es valido' + id }),
            {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
    }

    return NextResponse.next();
}
