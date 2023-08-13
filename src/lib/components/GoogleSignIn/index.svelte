<button id="wrapper" on:click>
    <div id="logo">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M21.1107 12.7089C21.1107 12.0571 21.0522 11.4305 20.9436 10.8289H12.2871V14.3842H17.2337C17.0206 15.5331 16.373 16.5065 15.3996 17.1583V19.4645H18.37C20.108 17.8643 21.1107 15.508 21.1107 12.7089Z" fill="#4285F4" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2869 21.6912C14.7685 21.6912 16.8491 20.8682 18.3698 19.4644L15.3994 17.1582C14.5763 17.7097 13.5235 18.0356 12.2869 18.0356C9.89297 18.0356 7.86672 16.4188 7.14396 14.2463H4.07324V16.6276C5.58562 19.6315 8.69393 21.6912 12.2869 21.6912Z" fill="#34A853" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.14452 14.2464C6.96069 13.6949 6.85625 13.1058 6.85625 12.5C6.85625 11.8942 6.96069 11.3052 7.14452 10.7537V8.37231H4.07381C3.45131 9.61313 3.09619 11.0169 3.09619 12.5C3.09619 13.9832 3.45131 15.3869 4.07381 16.6277L7.14452 14.2464Z" fill="#FBBC05" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2869 6.96433C13.6363 6.96433 14.8479 7.42807 15.8004 8.33884L18.4367 5.70262C16.8449 4.21949 14.7643 3.30872 12.2869 3.30872C8.69393 3.30872 5.58562 5.36839 4.07324 8.37226L7.14396 10.7536C7.86672 8.58115 9.89297 6.96433 12.2869 6.96433Z" fill="#EA4335" />
        </svg>
    </div>

    <div id="text">Sign in with Google</div>
</button>

<style lang="scss">
    #wrapper {
        display: flex;
        justify-content: center;
        padding: 1rem 0rem;
        align-items: center;
        gap: 0.5rem;
        align-self: stretch;

        gap: 0.5rem;

        border-radius: 0.1075rem;
        border: 1px solid $border;
        background: #fff;

        cursor: pointer;

        // ! bad practice
        max-height: 53px;

        #logo {
            display: flex;
            width: 2.5rem;
            height: 2.5rem;
            padding: 0.5rem;
            justify-content: center;
            align-items: center;

            svg {
                width: 1.53188rem;
                height: 1.53188rem;
                flex-shrink: 0;
            }
        }

        #text {
            color: #757575;
            font-family: Work Sans;
            font-size: 1rem;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            letter-spacing: -0.03rem;
        }
    }
</style>
