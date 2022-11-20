import Image from "next/image";

const Home = () => (
  <section className="text-neutral-800 mx-auto my-0 max-w-[700px] space-y-3">
    <h1 className="text-4xl">This is OGP Server for Rintaro!</h1>
    <ul className="bg-gray-100 p-7">
      <li className="list-disc list-inside">
        GitHub:
        <a
          href="https://github.com/re-taro-dev/ogp.re-taro.dev"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          https://github.com/re-taro-dev/ogp.re-taro.dev
        </a>
      </li>
    </ul>
    <h2 className="text-2xl">Sample</h2>
    <p>https://ogp.re-taro.dev/api/ogp?title=ogp.re-taro.dev&date=2004-04-25</p>
    <Image
      src={"https://ogp.re-taro.dev/api/ogp?title=ogp.re-taro.dev&date=2004-04-25"}
      alt="OGP"
      width={1200}
      height={630}
    />
  </section>
);

export default Home;
