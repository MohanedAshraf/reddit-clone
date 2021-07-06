import Head from 'next/head';
import { Fragment } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';

import { Sub } from '../types';

import PostCard from '../components/PostCard';

dayjs.extend(relativeTime);
export default function Home() {
  const { data: posts } = useSWR('/posts');
  const { data: topSubs } = useSWR('/misc/top-subs');

  return (
    <Fragment>
      <Head>
        <title>diggit: the front page of the internet</title>
      </Head>

      <div className="container flex pt-4">
        {/* Posts feed */}
        <div className="w-160">
          {posts?.map((post) => {
            return <PostCard post={post} key={post.identifier} />;
          })}
        </div>
        {/* SideBar */}

        <div className="ml-6 w-80">
          <div className="bg-white rounded">
            <div className="p-4 border-b-2">
              <p className="text-lg font-semibold text-center">
                Top Communities
              </p>
            </div>
            <div>
              {topSubs?.map((sub: Sub) => {
                return (
                  <div
                    key={sub.name}
                    className="flex items-center px-4 py-2 text-xs border-bottom"
                  >
                    <div className="mr-2">
                      <Link href={`/r/${sub.name}`}>
                        <Image
                          src={sub.imageUrl}
                          alt="Sub"
                          width={(6 * 16) / 4}
                          height={(6 * 16) / 4}
                          className="rounded-full cursor-pointer"
                        />
                      </Link>
                    </div>

                    <Link href={`/r/${sub.name}`}>
                      <a className="font-bold hover:cursor-pointer">
                        /r/${sub.name}
                      </a>
                    </Link>
                    <p className="ml-auto font-med">{sub.postCount}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
